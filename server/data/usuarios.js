const pool = require('../config/database');

// Obtener todos los usuarios con filtro opcional por rol
const getAllUsers = async (rol = null) => {
    try {
        let query = `
            SELECT 
                u.num_control as id,
                u.nombre as nombres,
                u.apellidos,
                u.contraseña,
                u.rol_usuario as rol,
                u.estado,
                u.fecha_nacimiento as fNacimiento,
                u.curp,
                u.num_telefono as telefono,
                u.direccion,
                CASE 
                    WHEN u.rol_usuario = 'administrador' THEN a.correo_instit
                    WHEN u.rol_usuario = 'docente' THEN d.correo_instit
                    WHEN u.rol_usuario = 'alumno' THEN al.correo_instit
                END as correo,
                d.rfc,
                d.desc_formacion as descripcion,
                d.fecha_ingreso as fIngreso,
                d.especialidad,
                al.carrera,
                al.semestre
            FROM Usuarios u
            LEFT JOIN Administrador a ON u.num_control = a.num_control
            LEFT JOIN Docentes d ON u.num_control = d.num_control
            LEFT JOIN Alumnos al ON u.num_control = al.num_control
        `;

        if (rol) {
            query += ` WHERE u.rol_usuario = ?`;
            const [rows] = await pool.query(query, [rol]);
            return rows;
        }

        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error en getAllUsers:', error);
        throw error;
    }
};

// Alias de getAllUsers para mantener compatibilidad
const getUsers = async () => {
    try {
        return await getAllUsers();
    } catch (error) {
        console.error('Error en getUsers:', error);
        throw error;
    }
};

// Obtener usuario por num_control (ID)
const getUserById = async (numControl) => {
    try {
        const query = `
            SELECT 
                u.num_control as id,
                u.nombre as nombres,
                u.apellidos,
                u.contraseña,
                u.rol_usuario as rol,
                u.estado,
                u.fecha_nacimiento as fNacimiento,
                u.curp,
                u.num_telefono as telefono,
                u.direccion,
                CASE 
                    WHEN u.rol_usuario = 'administrador' THEN a.correo_instit
                    WHEN u.rol_usuario = 'docente' THEN d.correo_instit
                    WHEN u.rol_usuario = 'alumno' THEN al.correo_instit
                END as correo,
                d.rfc,
                d.desc_formacion as descripcion,
                d.fecha_ingreso as fIngreso,
                d.especialidad,
                al.carrera,
                al.semestre
            FROM Usuarios u
            LEFT JOIN Administrador a ON u.num_control = a.num_control
            LEFT JOIN Docentes d ON u.num_control = d.num_control
            LEFT JOIN Alumnos al ON u.num_control = al.num_control
            WHERE u.num_control = ?
        `;

        const [rows] = await pool.query(query, [numControl]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error('Error en getUserById:', error);
        throw error;
    }
};

// Agregar nuevo usuario
const addUser = async (usuario) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const {
            nombres,
            apellidos,
            contraseña,
            rol,
            fNacimiento,
            curp,
            telefono,
            direccion,
            correo,
            rfc,
            descripcion,
            fIngreso,
            especialidad,
            carrera,
            semestre
        } = usuario;

        // Validar que tenga números de control
        const numControl = usuario.id || usuario.num_control;
        if (!numControl) {
            throw new Error('Se requiere num_control');
        }

        // 1. Insertar en tabla Usuarios
        const insertUsuarioQuery = `
            INSERT INTO Usuarios (num_control, contraseña, rol_usuario, nombre, apellidos, estado, fecha_nacimiento, curp, num_telefono, direccion)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await connection.query(insertUsuarioQuery, [
            numControl,
            contraseña,
            rol,
            nombres,
            apellidos,
            'Activo',
            fNacimiento || null,
            curp || null,
            telefono || null,
            direccion || null
        ]);

        // 2. Insertar en tabla especializada según el rol
        if (rol === 'administrador') {
            const insertAdminQuery = `
                INSERT INTO Administrador (correo_instit, num_control)
                VALUES (?, ?)
            `;
            await connection.query(insertAdminQuery, [correo, numControl]);
        } 
        else if (rol === 'docente') {
            const insertDocenteQuery = `
                INSERT INTO Docentes (correo_instit, num_control, rfc, desc_formacion, fecha_ingreso, especialidad)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            await connection.query(insertDocenteQuery, [
                correo,
                numControl,
                rfc || null,
                descripcion || null,
                fIngreso || null,
                especialidad || null
            ]);
        } 
        else if (rol === 'alumno') {
            const insertAlumnoQuery = `
                INSERT INTO Alumnos (correo_instit, num_control, carrera, semestre)
                VALUES (?, ?, ?, ?)
            `;
            await connection.query(insertAlumnoQuery, [
                correo,
                numControl,
                carrera || null,
                semestre || 1
            ]);
        }

        await connection.commit();

        // Retornar usuario creado
        return await getUserById(numControl);
    } catch (error) {
        await connection.rollback();
        console.error('Error en addUser:', error);
        throw error;
    } finally {
        connection.release();
    }
};

// Actualizar usuario
const updateUser = async (numControl, datosActualizacion) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const usuarioActual = await getUserById(numControl);
        if (!usuarioActual) {
            throw new Error('Usuario no encontrado');
        }

        const usuarioFinal = {
            ...usuarioActual,
            ...datosActualizacion,
        };

        const contraseñaFinal = typeof datosActualizacion.contraseña === 'string' && datosActualizacion.contraseña.trim() !== ''
            ? datosActualizacion.contraseña
            : usuarioActual.contraseña;

        const rolAnterior = usuarioActual.rol;
        const rolNuevo = usuarioFinal.rol || rolAnterior;

        const {
            nombres,
            apellidos,
            contraseña,
            fNacimiento,
            curp,
            telefono,
            direccion,
            correo,
            rfc,
            descripcion,
            fIngreso,
            especialidad,
            carrera,
            semestre,
            estado
        } = usuarioFinal;

        // 1. Actualizar tabla Usuarios
        const updateUsuarioQuery = `
            UPDATE Usuarios 
            SET contraseña = ?, rol_usuario = ?, nombre = ?, apellidos = ?, estado = ?, fecha_nacimiento = ?, curp = ?, 
                num_telefono = ?, direccion = ?
            WHERE num_control = ?
        `;

        await connection.query(updateUsuarioQuery, [
            contraseñaFinal,
            rolNuevo,
            nombres || null,
            apellidos || null,
            estado || 'Activo',
            fNacimiento || null,
            curp || null,
            telefono || null,
            direccion || null,
            numControl
        ]);

        const deleteSpecializedByRole = async (rol) => {
            if (rol === 'administrador') {
                await connection.query('DELETE FROM Administrador WHERE num_control = ?', [numControl]);
            }
            if (rol === 'docente') {
                await connection.query('DELETE FROM Docentes WHERE num_control = ?', [numControl]);
            }
            if (rol === 'alumno') {
                await connection.query('DELETE FROM Alumnos WHERE num_control = ?', [numControl]);
            }
        };

        if (rolAnterior !== rolNuevo) {
            await deleteSpecializedByRole(rolAnterior);
        }

        if (rolNuevo === 'administrador') {
            if (rolAnterior !== 'administrador') {
                const insertAdminQuery = `
                    INSERT INTO Administrador (correo_instit, num_control)
                    VALUES (?, ?)
                `;
                await connection.query(insertAdminQuery, [correo || null, numControl]);
            } else {
                const updateAdminQuery = `
                    UPDATE Administrador SET correo_instit = ? WHERE num_control = ?
                `;
                await connection.query(updateAdminQuery, [correo || null, numControl]);
            }
        } else if (rolNuevo === 'docente') {
            if (rolAnterior !== 'docente') {
                const insertDocenteQuery = `
                    INSERT INTO Docentes (correo_instit, num_control, rfc, desc_formacion, fecha_ingreso, especialidad)
                    VALUES (?, ?, ?, ?, ?, ?)
                `;
                await connection.query(insertDocenteQuery, [
                    correo || null,
                    numControl,
                    rfc || null,
                    descripcion || null,
                    fIngreso || null,
                    especialidad || null
                ]);
            } else {
                const updateDocenteQuery = `
                    UPDATE Docentes 
                    SET correo_instit = ?, rfc = ?, desc_formacion = ?, fecha_ingreso = ?, especialidad = ?
                    WHERE num_control = ?
                `;
                await connection.query(updateDocenteQuery, [
                    correo || null,
                    rfc || null,
                    descripcion || null,
                    fIngreso || null,
                    especialidad || null,
                    numControl
                ]);
            }
        } else if (rolNuevo === 'alumno') {
            if (rolAnterior !== 'alumno') {
                const insertAlumnoQuery = `
                    INSERT INTO Alumnos (correo_instit, num_control, carrera, semestre)
                    VALUES (?, ?, ?, ?)
                `;
                await connection.query(insertAlumnoQuery, [
                    correo || null,
                    numControl,
                    carrera || null,
                    semestre || 1
                ]);
            } else {
                const updateAlumnoQuery = `
                    UPDATE Alumnos 
                    SET correo_instit = ?, carrera = ?, semestre = ?
                    WHERE num_control = ?
                `;
                await connection.query(updateAlumnoQuery, [
                    correo || null,
                    carrera || null,
                    semestre || null,
                    numControl
                ]);
            }
        }

        await connection.commit();

        // Retornar usuario actualizado
        return await getUserById(numControl);
    } catch (error) {
        await connection.rollback();
        console.error('Error en updateUser:', error);
        throw error;
    } finally {
        connection.release();
    }
};

// Eliminar usuario
const deleteUser = async (numControl) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Las eliminaciones en cascada se manejan automáticamente por las FK
        const deleteQuery = 'DELETE FROM Usuarios WHERE num_control = ?';
        const [result] = await connection.query(deleteQuery, [numControl]);

        await connection.commit();

        return result.affectedRows > 0;
    } catch (error) {
        await connection.rollback();
        console.error('Error en deleteUser:', error);
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = {
    getAllUsers,
    getUsers,      // AGREGADO - alias de getAllUsers
    getUserById,
    addUser,
    updateUser,
    deleteUser
};