# Configuración de la Base de Datos MySQL

## Requisitos Previos

1. **MySQL Server instalado** (versión 5.7 o superior)
2. **Node.js 14+**

## Pasos de Configuración

### 1. Crear la Base de Datos

```bash
# Conectarse a MySQL
mysql -u root -p

# Crear la base de datos
CREATE DATABASE sigau CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Seleccionar la base de datos
USE sigau;
```

### 2. Ejecutar el Script de Creación de Tablas

```bash
# Desde la línea de comandos (fuera de MySQL)
mysql -u root -p sigau < server/config/schema.sql

# O desde dentro de MySQL
mysql> source server/config/schema.sql;
```

### 3. Configurar Variables de Entorno

1. Copiar `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Editar el archivo `.env` con tu configuración:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=sigau
DB_PORT=3306
PORT=3001
```

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Iniciar el Servidor

```bash
npm run dev
```

## Estructura de Datos

### Tabla Usuarios (Base)
Contiene la información común a todos los tipos de usuarios:
- `num_control`: ID único del usuario
- `contraseña`: Contraseña encriptada
- `rol_usuario`: administrador, docente, alumno
- `nombre`, `apellidos`: Información personal
- `fecha_nacimiento`, `curp`, `num_telefono`, `direccion`: Datos adicionales

### Tablas Especializadas
- **Administrador**: Información específica de administradores
- **Docentes**: Información de docentes (RFC, especialidad, etc.)
- **Alumnos**: Información de alumnos (carrera, semestre)

## Endpoints Disponibles

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Obtener todos los usuarios (con filtro opcional: `?rol=docente`) |
| GET | `/api/usuarios/:id` | Obtener usuario por num_control |
| POST | `/api/usuarios` | Crear nuevo usuario |
| PUT | `/api/usuarios/:id` | Actualizar usuario |
| DELETE | `/api/usuarios/:id` | Eliminar usuario |

### Materias

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/materias` | Obtener todas las materias |
| GET | `/api/materias/:id` | Obtener materia por ID |
| GET | `/api/materias/semestre/:semestre` | Obtener materias por semestre |
| POST | `/api/materias` | Crear materia |
| PUT | `/api/materias/:id` | Actualizar materia |
| DELETE | `/api/materias/:id` | Eliminar materia |

### Estadisticas y Reportes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/estadisticas/dashboard` | Obtener indicadores principales |
| GET | `/api/estadisticas/alumnos-por-semestre` | Obtener distribución de alumnos por semestre |
| GET | `/api/estadisticas/evolucion-calificaciones` | Obtener serie histórica de calificaciones |
| GET | `/api/reportes/rendimiento-materias` | Obtener rendimiento de todas las materias |
| GET | `/api/reportes/rendimiento-materias/:id` | Obtener rendimiento de una materia específica |

### Ejemplo de Creación de Usuario

```json
POST /api/usuarios
{
  "id": 12345,
  "nombres": "Juan",
  "apellidos": "Pérez García",
  "contraseña": "hashed_password",
  "rol": "docente",
  "fNacimiento": "1985-05-15",
  "curp": "PEGJ850515HDFRZN09",
  "telefono": "8120963333",
  "direccion": "Calle Principal 123",
  "correo": "juan.perez@sigau.edu.mx",
  "rfc": "PEGJ850515XXX",
  "descripcion": "Especialista en Matemáticas",
  "fIngreso": "2015-01-20",
  "especialidad": "Matemáticas Avanzadas"
}
```

### Datos Iniciales de Materias (Opcional)

```sql
INSERT INTO Materias (id, nombre, creditos, semestre, estado, descripcion) VALUES
(202, 'Fundamentos de telecomunicaciones', 95, 1, 'Activo', 'Introducción a los conceptos básicos de telecomunicaciones'),
(203, 'Física Cuántica Avanzada', 85, 6, 'Activo', 'Estudio avanzado de mecánica cuántica'),
(303, 'Matemáticas Avanzadas', 90, 5, 'Activo', 'Análisis matemático avanzado y álgebra lineal'),
(204, 'Programación Web', 80, 3, 'Activo', 'Desarrollo de aplicaciones web modernas'),
(205, 'Bases de Datos', 75, 4, 'Activo', 'Diseño y gestión de bases de datos');
```

### Datos Iniciales de Estadisticas (Opcional)

```sql
INSERT INTO EvolucionCalificaciones (etiqueta_mes, calificacion, orden) VALUES
('Ene 22', 6.8, 1),
('Abr 22', 7.2, 2),
('Jul 22', 7.5, 3),
('Oct 22', 7.9, 4),
('Ene 23', 8.1, 5);

INSERT INTO RendimientoMaterias (materia_id, profesor, cantidad_alumnos, promedio_calificacion, tasa_aprobacion, avatar_profesor) VALUES
(303, 'Dr. Roberto Silva', 45, 7.8, 75, 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg'),
(203, 'Carlos Martinez Mendoza', 38, 7.9, 82, 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg'),
(202, 'Carlos Macias Mendez', 52, 7.6, 79, 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg');
```

## Solución de Problemas

### Error de Conexión a MySQL
- Verificar que MySQL esté corriendo: `mysql -u root -p`
- Revisar credenciales en `.env`
- Asegurar que la base de datos `sigau` existe

### Error: "Unknown column" 
- Ejecutar nuevamente el script `schema.sql`
- Verificar que todas las tablas estén creadas: `SHOW TABLES;`

### Error de Transacción
- Asegurar que MySQL tenga soporte para transacciones (InnoDB)

## Notas Importantes

1. Las contraseñas deben ser hash antes de guardarlas (implementar bcrypt)
2. Los valores NULL se permiten en campos opcionales
3. Las claves foráneas están configuradas con CASCADE para borrado en cascada
4. El campo `curp` es único, al igual que los RFC y correos institucionales
