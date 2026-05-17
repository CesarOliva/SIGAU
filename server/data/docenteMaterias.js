const pool = require('../config/database');

// Obtener todas las asignaciones de materias a docentes
const getAllAsignaciones = async () => {
    try {
        const query = `
            SELECT 
                dm.id,
                dm.docente_id,
                dm.materia_id,
                u.nombre as docente_nombre,
                u.apellidos as docente_apellidos,
                d.especialidad,
                m.nombre as materia_nombre,
                m.semestre,
                m.creditos,
                dm.fecha_asignacion,
                dm.estado
            FROM DocenteMaterias dm
            INNER JOIN Usuarios u ON dm.docente_id = u.num_control
            INNER JOIN Docentes d ON u.num_control = d.num_control
            INNER JOIN Materias m ON dm.materia_id = m.id
            ORDER BY u.apellidos, u.nombre
        `;
        
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error en getAllAsignaciones:', error);
        throw error;
    }
};

// Obtener materias asignadas a un docente específico
const getMateriasDocente = async (docenteId) => {
    try {
        const query = `
            SELECT 
                dm.id,
                m.id as materia_id,
                m.nombre,
                m.semestre,
                m.creditos,
                m.descripcion,
                dm.fecha_asignacion,
                dm.estado
            FROM DocenteMaterias dm
            INNER JOIN Materias m ON dm.materia_id = m.id
            WHERE dm.docente_id = ? AND dm.estado = 'Activo'
            ORDER BY m.semestre, m.nombre
        `;
        
        const [rows] = await pool.query(query, [docenteId]);
        return rows;
    } catch (error) {
        console.error('Error en getMateriasDocente:', error);
        throw error;
    }
};

// Obtener docentes asignados a una materia específica
const getDocentesMateria = async (materiaId) => {
    try {
        const query = `
            SELECT 
                dm.id,
                u.num_control as docente_id,
                u.nombre,
                u.apellidos,
                d.especialidad,
                d.rfc,
                dm.fecha_asignacion,
                dm.estado
            FROM DocenteMaterias dm
            INNER JOIN Usuarios u ON dm.docente_id = u.num_control
            INNER JOIN Docentes d ON u.num_control = d.num_control
            WHERE dm.materia_id = ? AND dm.estado = 'Activo'
            ORDER BY u.apellidos, u.nombre
        `;
        
        const [rows] = await pool.query(query, [materiaId]);
        return rows;
    } catch (error) {
        console.error('Error en getDocentesMateria:', error);
        throw error;
    }
};

// Asignar una materia a un docente
const asignarMateria = async (docenteId, materiaId) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        // Verificar que el docente existe
        const [docentes] = await connection.query(
            'SELECT num_control FROM Usuarios WHERE num_control = ? AND rol_usuario = "docente"',
            [docenteId]
        );
        if (docentes.length === 0) {
            throw new Error('Docente no encontrado');
        }

        // Verificar que la materia existe
        const [materias] = await connection.query(
            'SELECT id FROM Materias WHERE id = ?',
            [materiaId]
        );
        if (materias.length === 0) {
            throw new Error('Materia no encontrada');
        }

        // Insertar asignación
        const [result] = await connection.query(
            'INSERT INTO DocenteMaterias (docente_id, materia_id, estado) VALUES (?, ?, "Activo")',
            [docenteId, materiaId]
        );

        await connection.commit();

        // Retornar la asignación creada
        const [rows] = await connection.query(
            `SELECT 
                dm.id,
                dm.docente_id,
                dm.materia_id,
                u.nombre as docente_nombre,
                u.apellidos as docente_apellidos,
                d.especialidad,
                m.nombre as materia_nombre,
                m.semestre,
                m.creditos,
                dm.fecha_asignacion,
                dm.estado
            FROM DocenteMaterias dm
            INNER JOIN Usuarios u ON dm.docente_id = u.num_control
            INNER JOIN Docentes d ON u.num_control = d.num_control
            INNER JOIN Materias m ON dm.materia_id = m.id
            WHERE dm.id = ?`,
            [result.insertId]
        );

        return rows[0] || null;
    } catch (error) {
        await connection.rollback();
        console.error('Error en asignarMateria:', error);
        throw error;
    } finally {
        connection.release();
    }
};

// Desasignar una materia de un docente
const desasignarMateria = async (asignacionId) => {
    try {
        const query = 'DELETE FROM DocenteMaterias WHERE id = ?';
        const [result] = await pool.query(query, [asignacionId]);
        
        if (result.affectedRows === 0) {
            throw new Error('Asignación no encontrada');
        }

        return { mensaje: 'Materia desasignada correctamente' };
    } catch (error) {
        console.error('Error en desasignarMateria:', error);
        throw error;
    }
};

// Obtener materias no asignadas a un docente
const getMateriasDisponibles = async (docenteId) => {
    try {
        const query = `
            SELECT m.id, m.nombre, m.semestre, m.creditos, m.descripcion
            FROM Materias m
            WHERE m.estado = 'Activo' 
            AND m.id NOT IN (
                SELECT materia_id FROM DocenteMaterias 
                WHERE docente_id = ? AND estado = 'Activo'
            )
            ORDER BY m.semestre, m.nombre
        `;
        
        const [rows] = await pool.query(query, [docenteId]);
        return rows;
    } catch (error) {
        console.error('Error en getMateriasDisponibles:', error);
        throw error;
    }
};

module.exports = {
    getAllAsignaciones,
    getMateriasDocente,
    getDocentesMateria,
    asignarMateria,
    desasignarMateria,
    getMateriasDisponibles
};
