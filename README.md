# CRUD de Usuarios (Sistema de Gestión de Usuarios)

Este proyecto implementa un sistema CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de usuarios, desarrollado con React en el frontend y Flask en el backend, utilizando PostgreSQL como base de datos.

## Características

- Crear nuevos usuarios.
- Mostrar una lista de usuarios existentes.
- Buscar usuarios por nombre o correo electrónico.
- Actualizar información de usuarios.
- Eliminar usuarios.
- **Truncar nombres de usuario si exceden los 10 caracteres, mostrando "..."**
- Mostrar el total de usuarios registrados.

## Tecnologías Utilizadas

**Frontend:**

- React (con Vite)
- HTML, CSS

**Backend:**

- Python (Flask)
- SQLAlchemy (ORM)

**Base de Datos:**

- PostgreSQL (gestionado a través de AWS RDS)

**Contenedorización y Orquestación:**

- Docker
- Docker Compose

**Despliegue:**

- Amazon Web Services (AWS EC2)

---

### **Despliegue en la Nube (AWS EC2)**

Esta sección es crucial para los revisores.

El proyecto ha sido desplegado exitosamente en una instancia de Amazon EC2, utilizando Docker y Docker Compose para gestionar los servicios del frontend, backend y la conexión a una base de datos PostgreSQL en AWS RDS.

**URL de la Aplicación Desplegada:**
Puedes acceder a la aplicación en vivo a través de la siguiente URL:

➡️ [**http:3.21.247.78**](http://3.21.247.78) ⬅️

_(Reemplaza `TU_DIRECCION_IPV4_PUBLICA_EC2` con la IP pública de tu instancia EC2, por ejemplo: `http://3.21.247.78`)_

**Detalles del Despliegue:**

- **Instancia EC2:** Se utilizó una instancia de Ubuntu para alojar los contenedores Docker.
- **Base de Datos RDS:** La base de datos PostgreSQL reside en un servicio RDS separado para mayor escalabilidad y gestión.
- **Docker Compose:** Utilizado para orquestar la comunicación entre el frontend (servido por Nginx) y el backend (Flask), ambos ejecutándose en contenedores separados dentro de la misma red de Docker.
- **Nginx:** El frontend de React es servido por un contenedor Nginx configurado para proxying las solicitudes API al servicio de backend.

**Proceso de Despliegue (Resumen):**

1.  Creación de una instancia EC2 (Ubuntu).
2.  Instalación de Docker Engine y Docker Compose (v2) en la instancia EC2.
3.  Clonación del repositorio del proyecto en la instancia EC2.
4.  Configuración de las variables de entorno para la conexión a AWS RDS.
5.  Ejecución de `docker compose up --build -d` para construir las imágenes y levantar los servicios.
6.  Configuración de grupos de seguridad de EC2 para permitir el tráfico HTTP (puerto 80) y SSH (puerto 22).

---

### **Cómo Probar el Despliegue en EC2:**

1.  Abre la URL proporcionada en tu navegador: [http://3.21.247.78](http://3.21.247.78)
2.  Verifica que la página de inicio se carga correctamente.
3.  Navega a la sección "Usuarios".
4.  **Prueba la funcionalidad CRUD:**
    - Crea nuevos usuarios.
    - Verifica que los nombres de usuario con más de 10 caracteres se truncan con "...".
    - Edita usuarios existentes.
    - Elimina usuarios.
    - Usa la barra de búsqueda para filtrar usuarios.
5.  Observa el contador de usuarios para verificar que se actualiza correctamente.

---
