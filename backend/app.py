from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

# Configuración de RDS (modificar con tus datos)
DB_HOST = "crud-db.cpmyy02y07q0.us-east-2.rds.amazonaws.com"
DB_NAME = "crud"
DB_USER = "postgres"
DB_PASS = "lK7xWD7fE2Ewuge"

def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASS
    )

# ------------------------- HELPER FUNCTIONS -------------------------
def validate_user_data(data, check_id=False):
    errors = {}
    
    if check_id and 'id' not in data:
        errors['id'] = "ID es requerido"
    
    if 'name' not in data or not data['name'].strip():
        errors['name'] = "Nombre es requerido"
    
    if 'email' not in data or not data['email'].strip():
        errors['email'] = "Email es requerido"
    
    if 'age' not in data:
        errors['age'] = "Edad es requerida"
    else:
        try:
            int(data['age']) 
        except ValueError:
            errors['age'] = "Edad debe ser un número"
    
    return errors if errors else None

# ------------------------- ENDPOINTS -------------------------
@app.route('/users', methods=['GET'])
def get_users():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute('SELECT id, name, email, age FROM users;')
        users = cur.fetchall()
        
        users_list = [{
            'id': user[0],
            'name': user[1],
            'email': user[2],
            'age': user[3]
        } for user in users]
        
        return jsonify(users_list)
        
    except psycopg2.Error as e:
        return jsonify({'error': 'Error de base de datos'}), 500
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    

    if error := validate_user_data(data):
        return jsonify(error), 400
    
    try:
        age = int(data['age'])  
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute(
            '''INSERT INTO users (name, email, age) 
            VALUES (%(name)s, %(email)s, %(age)s)
            RETURNING id, name, email, age''',
            {
                'name': data['name'].strip(),
                'email': data['email'].strip(),
                'age': age
            }
        )
        
        new_user = cur.fetchone()
        conn.commit()
        
        return jsonify({
            'id': new_user[0],
            'name': new_user[1],
            'email': new_user[2],
            'age': new_user[3]
        }), 201
        
    except ValueError:
        return jsonify({'error': 'Edad inválida'}), 400
    except psycopg2.IntegrityError:
        return jsonify({'error': 'El email ya existe'}), 409
    except Exception as e:
        conn.rollback()
        return jsonify({'error': 'Error del servidor'}), 500
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.get_json()
    

    if error := validate_user_data(data):
        return jsonify(error), 400
    
    try:
        age = int(data['age'])  
        conn = get_db_connection()
        cur = conn.cursor()
        
       
        cur.execute('SELECT id FROM users WHERE id = %s', (user_id,))
        if not cur.fetchone():
            return jsonify({'error': 'Usuario no encontrado'}), 404
        
   
        cur.execute(
            '''UPDATE users 
            SET name = %(name)s, email = %(email)s, age = %(age)s 
            WHERE id = %(id)s
            RETURNING id, name, email, age''',
            {
                'id': user_id,
                'name': data['name'].strip(),
                'email': data['email'].strip(),
                'age': age
            }
        )
        
        updated_user = cur.fetchone()
        conn.commit()
        
        return jsonify({
            'id': updated_user[0],
            'name': updated_user[1],
            'email': updated_user[2],
            'age': updated_user[3]
        })
        
    except ValueError:
        return jsonify({'error': 'Edad inválida'}), 400
    except psycopg2.IntegrityError:
        return jsonify({'error': 'El email ya existe'}), 409
    except Exception as e:
        conn.rollback()
        return jsonify({'error': 'Error del servidor'}), 500
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        
        cur.execute('SELECT id FROM users WHERE id = %s', (user_id,))
        if not cur.fetchone():
            return jsonify({'error': 'Usuario no encontrado'}), 404
        
        cur.execute('DELETE FROM users WHERE id = %s', (user_id,))
        conn.commit()
        
        return jsonify({'message': 'Usuario eliminado correctamente'}), 200
        
    except Exception as e:
        conn.rollback()
        return jsonify({'error': 'Error del servidor'}), 500
    finally:
        if 'cur' in locals(): cur.close()
        if 'conn' in locals(): conn.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)