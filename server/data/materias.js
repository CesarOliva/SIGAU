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
            materia.estado || 'Activo',
            materia.descripcion || null
        ]
        : [
            materia.nombre,
            materia.creditos,
            materia.semestre,
            materia.estado || 'Activo',
            materia.descripcion || null
        ];

    const [result] = await pool.query(query, values);
    const createdId = hasCustomId ? materia.id : result.insertId;
    return getMateriaById(createdId);
};

const getMateriaById = async (id) => {
    const [rows] = await pool.query(`${baseSelect} WHERE id = ?`, [id]);
    return rows.length > 0 ? rows[0] : null;
};

const getAllMaterias = async () => {
    const [rows] = await pool.query(`${baseSelect} ORDER BY id ASC`);
    return rows;
};

const getMateriasBySemestre = async (semestre) => {
    const [rows] = await pool.query(`${baseSelect} WHERE semestre = ? ORDER BY id ASC`, [semestre]);
    return rows;
};

const deleteMateria = async (id) => {
    const [result] = await pool.query('DELETE FROM Materias WHERE id = ?', [id]);
    return result.affectedRows > 0;
};

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

module.exports = {
    addMateria,
    getMateriaById,
    getAllMaterias,
    getMateriasBySemestre,
    deleteMateria,
    updateMateria
};
