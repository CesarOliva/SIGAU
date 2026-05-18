const pool = require('../config/database');

const baseSelect = `
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

const getAllUsers = async (rol = null) => {
    try {
        let query = baseSelect;
        if (rol) { query += ` WHERE u.rol_usuario = ?`; const [rows] = await pool.query(query, [rol]); return rows; }
        const [rows] = await pool.query(query); return rows;
    } catch (error) { console.error('Error en getAllUsers:', error); throw error; }
};

const getUsers = async (rol = null) => { try { return await getAllUsers(rol); } catch (error) { console.error('Error en getUsers:', error); throw error; } };

const getUserById = async (numControl) => {
    try {
        const [rows] = await pool.query(`${baseSelect} WHERE u.num_control = ?`, [numControl]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) { console.error('Error en getUserById:', error); throw error; }
};

const addUser = async (usuario) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const { nombres, apellidos, contraseña, rol, fNacimiento, curp, telefono, direccion, correo, rfc, descripcion, fIngreso, especialidad, carrera, semestre } = usuario;
        const numControl = usuario.id || usuario.num_control;
        if (!numControl) throw new Error('Se requiere num_control');
        await connection.query(`INSERT INTO Usuarios (num_control, contraseña, rol_usuario, nombre, apellidos, estado, fecha_nacimiento, curp, num_telefono, direccion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [numControl, contraseña, rol, nombres, apellidos, 'Activo', fNacimiento || null, curp || null, telefono || null, direccion || null]);
        if (rol === 'administrador') await connection.query(`INSERT INTO Administrador (correo_instit, num_control) VALUES (?, ?)`, [correo, numControl]);
        else if (rol === 'docente') await connection.query(`INSERT INTO Docentes (correo_instit, num_control, rfc, desc_formacion, fecha_ingreso, especialidad) VALUES (?, ?, ?, ?, ?, ?)`, [correo, numControl, rfc || null, descripcion || null, fIngreso || null, especialidad || null]);
        else if (rol === 'alumno') await connection.query(`INSERT INTO Alumnos (correo_instit, num_control, carrera, semestre) VALUES (?, ?, ?, ?)`, [correo, numControl, carrera || null, semestre || 1]);
        await connection.commit();
        return await getUserById(numControl);
    } catch (error) { await connection.rollback(); console.error('Error en addUser:', error); throw error; }
    finally { connection.release(); }
};

const updateUser = async (numControl, datosActualizacion) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const usuarioActual = await getUserById(numControl); if (!usuarioActual) throw new Error('Usuario no encontrado');
        const usuarioFinal = { ...usuarioActual, ...datosActualizacion };
        const contraseñaFinal = typeof datosActualizacion.contraseña === 'string' && datosActualizacion.contraseña.trim() !== '' ? datosActualizacion.contraseña : usuarioActual.contraseña;
        const rolAnterior = usuarioActual.rol; const rolNuevo = usuarioFinal.rol || rolAnterior;
        const { nombres, apellidos, fNacimiento, curp, telefono, direccion, correo, rfc, descripcion, fIngreso, especialidad, carrera, semestre, estado } = usuarioFinal;
        await connection.query(`UPDATE Usuarios SET contraseña = ?, rol_usuario = ?, nombre = ?, apellidos = ?, estado = ?, fecha_nacimiento = ?, curp = ?, num_telefono = ?, direccion = ? WHERE num_control = ?`, [contraseñaFinal, rolNuevo, nombres || null, apellidos || null, estado || 'Activo', fNacimiento || null, curp || null, telefono || null, direccion || null, numControl]);
        const deleteSpecializedByRole = async (rol) => { if (rol === 'administrador') await connection.query('DELETE FROM Administrador WHERE num_control = ?', [numControl]); if (rol === 'docente') await connection.query('DELETE FROM Docentes WHERE num_control = ?', [numControl]); if (rol === 'alumno') await connection.query('DELETE FROM Alumnos WHERE num_control = ?', [numControl]); };
        if (rolAnterior !== rolNuevo) await deleteSpecializedByRole(rolAnterior);
        if (rolNuevo === 'administrador') { if (rolAnterior !== 'administrador') await connection.query(`INSERT INTO Administrador (correo_instit, num_control) VALUES (?, ?)`, [correo || null, numControl]); else await connection.query(`UPDATE Administrador SET correo_instit = ? WHERE num_control = ?`, [correo || null, numControl]); }
        else if (rolNuevo === 'docente') { if (rolAnterior !== 'docente') await connection.query(`INSERT INTO Docentes (correo_instit, num_control, rfc, desc_formacion, fecha_ingreso, especialidad) VALUES (?, ?, ?, ?, ?, ?)`, [correo || null, numControl, rfc || null, descripcion || null, fIngreso || null, especialidad || null]); else await connection.query(`UPDATE Docentes SET correo_instit = ?, rfc = ?, desc_formacion = ?, fecha_ingreso = ?, especialidad = ? WHERE num_control = ?`, [correo || null, rfc || null, descripcion || null, fIngreso || null, especialidad || null, numControl]); }
        else if (rolNuevo === 'alumno') { if (rolAnterior !== 'alumno') await connection.query(`INSERT INTO Alumnos (correo_instit, num_control, carrera, semestre) VALUES (?, ?, ?, ?)`, [correo || null, numControl, carrera || null, semestre || 1]); else await connection.query(`UPDATE Alumnos SET correo_instit = ?, carrera = ?, semestre = ? WHERE num_control = ?`, [correo || null, carrera || null, semestre || null, numControl]); }
        await connection.commit(); return await getUserById(numControl);
    } catch (error) { await connection.rollback(); console.error('Error en updateUser:', error); throw error; }
    finally { connection.release(); }
};

const deleteUser = async (numControl) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const [result] = await connection.query('DELETE FROM Usuarios WHERE num_control = ?', [numControl]);
        await connection.commit(); return result.affectedRows > 0;
    } catch (error) { await connection.rollback(); console.error('Error en deleteUser:', error); throw error; }
    finally { connection.release(); }
};

// ✅ NUEVO: Guardar motivo de eliminación en auditoría
const logAudit = async (userId, reason) => {
    try {
        // CREATE TABLE IF NOT EXISTS auditoria_usuarios (id INT AUTO_INCREMENT PRIMARY KEY, usuario_id INT NOT NULL, motivo TEXT NOT NULL, fecha DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (usuario_id) REFERENCES Usuarios(num_control) ON DELETE CASCADE);
        await pool.query('INSERT INTO auditoria_usuarios (usuario_id, motivo) VALUES (?, ?)', [userId, reason]);
        return true;
    } catch (error) { console.error('Error al guardar auditoría:', error); return false; }
};

module.exports = { getAllUsers, getUsers, getUserById, addUser, updateUser, deleteUser, logAudit };