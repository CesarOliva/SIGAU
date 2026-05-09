# Integración MySQL - Resumen de Cambios

## 📦 Archivos Creados

### 1. **server/config/database.js**
- Configuración de conexión a MySQL usando `mysql2/promise`
- Pool de conexiones con parámetros configurables
- Soporta variables de entorno: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`

### 2. **server/config/schema.sql**
- Script SQL completo con la estructura de 4 tablas:
  - `Usuarios` (tabla base)
  - `Administrador`
  - `Docentes`
  - `Alumnos`
- Incluye restricciones, validaciones y relaciones

### 3. **server/config/sync.js**
- Función para sincronizar automáticamente la base de datos
- Ejecuta el script SQL desde Node.js
- Útil para desarrollo y testing

### 4. **server/config/SETUP.md**
- Guía completa de instalación y configuración
- Ejemplos de uso de endpoints
- Solución de problemas

### 5. **.env.example**
- Template con todas las variables de entorno necesarias

## 🔄 Archivos Modificados

### 1. **package.json**
```diff
+ "mysql2": "^3.6.5"
```

### 2. **server/data/usuarios.js**
**Cambios principales:**
- Reemplazado sistema en memoria con consultas MySQL
- Todas las funciones ahora son `async` y retornan promesas
- Soporta transacciones con BEGIN/COMMIT/ROLLBACK
- Maneja 3 tipos de usuarios con tablas especializadas:
  - Alumno
  - Docente
  - Administrador

**Funciones disponibles:**
```javascript
- getAllUsers(rol?)        // Obtener todos o filtrar por rol
- getUserById(numControl)  // Por num_control (ID)
- addUser(usuario)         // Crear nuevo usuario
- updateUser(id, datos)    // Actualizar usuario
- deleteUser(numControl)   // Eliminar usuario (cascada automática)
```

### 3. **server/controllers/usuario.controller.js**
**Cambios principales:**
- Todos los handlers ahora son `async`
- Usan `await` para las llamadas a la BD
- Mejores mensajes de error
- Validación actualizada para nuevos campos
- Removed campos como `matricula` que no están en el schema

**Campos de validación por rol:**
```
alumno:      ['nombres','apellidos','fNacimiento','curp','correo','telefono','direccion']
docente:     ['nombres','apellidos','fNacimiento','rfc','correo','telefono','direccion','descripcion','fIngreso','especialidad']
administrador: ['nombres','apellidos','fNacimiento','curp','correo','telefono','direccion']
```

### 4. **server/index.js**
- Añadido endpoint de health check: `/health`
- Mejorados logs con emojis

## 🚀 Cómo Usar

### Instalación
```bash
npm install
cp .env.example .env
# Editar .env con tu configuración de MySQL
```

### Crear la base de datos
```bash
mysql -u root -p sigau < server/config/schema.sql
```

### Iniciar servidor
```bash
npm run dev
```

## 📝 Ejemplo de Petición POST

```bash
curl -X POST http://localhost:3001/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "id": 12345,
    "nombres": "Juan",
    "apellidos": "García López",
    "contraseña": "hashed_password",
    "rol": "docente",
    "fNacimiento": "1985-05-15",
    "curp": "GALJ850515HDFRZN09",
    "telefono": "8120963333",
    "direccion": "Calle Principal 123",
    "correo": "juan.garcia@sigau.edu.mx",
    "rfc": "GALJ850515XXX",
    "descripcion": "Especialista en Ingeniería",
    "fIngreso": "2015-01-20",
    "especialidad": "Ingeniería en Sistemas"
  }'
```

## ⚠️ Próximos Pasos Recomendados

1. **Encriptación de contraseñas**: Implementar `bcrypt` para hash de contraseñas
2. **Autenticación**: Añadir JWT o sesiones
3. **Validación**: Validar CURP, RFC format
4. **Logging**: Implementar sistema de logs más robusto
5. **Testing**: Crear tests unitarios e integración

## 🔐 Notas de Seguridad

- Las contraseñas en las solicitudes deberían estar hasheadas del lado del cliente
- Implementar rate limiting en endpoints sensibles
- Usar HTTPS en producción
- Validar y sanitizar todas las entradas de usuario

## 📊 Próximas Integraciones

Siguiendo la misma estructura:
- Materias
- Estadísticas
- Calificaciones
- Horarios
