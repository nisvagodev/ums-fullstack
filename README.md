# Sistema de Gestión de Usuarios (CRUD React y Flask)

Aplicación full-stack para la gestión de usuarios, que cuenta con un frontend React y un backend Flask con PostgreSQL (AWS RDS).

## Características

- Añadir, Leer, Actualizar, Borrar (CRUD) [cite: 2]
- Buscar un usuario específico [cite: 3]
- Truncar nombres largos con «...» si superan los 10 caracteres (visualización en Frontend) [cite: 3]
- Mostrar el número total de usuarios [cite: 3]

## Tecnologías usadas

**Frontend:**

- React
- Vite
- React Router DOM
- Font Awesome

**Backend:**

- Flask
- Psycopg2 (Adaptador PostgreSQL)
- Flask-CORS
- Gunicorn

**Base de datos:**

- PostgreSQL (AWS RDS)

**Despliegue y Orquestación:**

- Docker
- Docker Compose
- AWS EC2
