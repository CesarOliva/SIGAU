const pool = require('../config/database');

const baseSelect = `
    SELECT
        id,
        nombre,
        creditos,
        semestre,
        estado,
        descripcion,
        fecha_creacion AS fechaCreacion
    FROM Materias
`;

// ✅ Crear materia
const addMateria = async (materia) => {
    const hasCustomId = materia.id !== undefined && materia.id !== null;

    const query = hasCustomId
        ? `
            INSERT INTO Materias (id, nombre, creditos, semestre, estado, descripcion)
            VALUES (?, ?, ?, ?, ?, ?)
        `
        : `
            INSERT INTO Materias (nombre, creditos, semestre, estado, descripcion)
            VALUES (?, ?, ?, ?, ?)
        `;

    const values = hasCustomId
        ? [
            materia.id,
            materia.nombre,
            materia.creditos,
            materia.semestre,
            materia.estado || 'activo',  // ✅ lowercase para coincidir con frontend
            materia.descripcion || null
        ]
        : [
            materia.nombre,
            materia.creditos,
            materia.semestre,
            materia.estado || 'activo',  // ✅ lowercase
            materia.descripcion || null
        ];

    const [result] = await pool.query(query, values);
    const createdId = hasCustomId ? materia.id : result.insertId;
    return getMateriaById(createdId);
};

// ✅ Obtener materia por ID
const getMateriaById = async (id) => {
    const [rows] = await pool.query(`${baseSelect} WHERE id = ?`, [id]);
    return rows.length > 0 ? rows[0] : null;
};

// ✅ Obtener todas las materias (incluye inactivas para mostrarlas en gris)
const getAllMaterias = async () => {
    const [rows] = await pool.query(`${baseSelect} ORDER BY id ASC`);
    return rows;
};

// ✅ Obtener materias por semestre
const getMateriasBySemestre = async (semestre) => {
    const [rows] = await pool.query(`${baseSelect} WHERE semestre = ? ORDER BY id ASC`, [semestre]);
    return rows;
};

// ✅ Eliminar materia DEFINITIVAMENTE
const deleteMateria = async (id) => {
    const [result] = await pool.query('DELETE FROM Materias WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

// ✅ Actualizar materia (soporta campo 'estado' para activar/desactivar)
const updateMateria = async (id, updates) => {
    const camposPermitidos = ['nombre', 'creditos', 'semestre', 'estado', 'descripcion'];
    const campos = [];
    const valores = [];

    for (const campo of camposPermitidos) {
        if (updates[campo] !== undefined) {
            campos.push(`${campo} = ?`);
            valores.push(updates[campo]);
        }
    }

    if (campos.length === 0) {
        return getMateriaById(id);
    }

    valores.push(id);

    const query = `UPDATE Materias SET ${campos.join(', ')} WHERE id = ?`;
    await pool.query(query, valores);
    return getMateriaById(id);
};

// ✅ NUEVO: Guardar motivo de eliminación en auditoría (opcional pero recomendado)
const logAudit = async (materiaId, reason) => {
    try {
        // Si no existe la tabla, créala con este SQL:
        // CREATE TABLE IF NOT EXISTS auditoria_materias (
        //     id INT AUTO_INCREMENT PRIMARY KEY,
        //     materia_id INT NOT NULL,
        //     motivo TEXT NOT NULL,
        //     fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
        //     FOREIGN KEY (materia_id) REFERENCES Materias(id) ON DELETE CASCADE
        // );
        
        await pool.query(
            'INSERT INTO auditoria_materias (materia_id, motivo) VALUES (?, ?)',
            [materiaId, reason]
        );
        return true;
    } catch (error) {
        console.error('Error al guardar auditoría:', error);
        return false; // No falla la eliminación si falla la auditoría
    }
};

module.exports = {
    addMateria,
    getMateriaById,
    getAllMaterias,
    getMateriasBySemestre,
    deleteMateria,
    updateMateria,
    logAudit  // ✅ Exportado para usar en el controller
};