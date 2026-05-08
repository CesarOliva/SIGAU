const data = require('../data/materias');

// Obtener todas las materias
const getAllMaterias = (req, res) => {
    try {
        const materias = data.getAllMaterias();
        return res.status(200).json(materias);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener materias' });
    }
};

// Obtener materia por ID
const getMateriaById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }
        
        const materia = data.getMateriaById(id);
        
        if (!materia) {
            return res.status(404).json({ error: "Materia no encontrada" });
        }
        
        return res.status(200).json(materia);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener la materia' });
    }
};

// Obtener materias por semestre
const getMateriasBySemestre = (req, res) => {
    try {
        const semestre = parseInt(req.query.semestre);
        
        if (isNaN(semestre)) {
            return res.status(400).json({ error: "Semestre inválido" });
        }
        
        const materias = data.getMateriasBySemestre(semestre);
        return res.status(200).json(materias);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener materias por semestre' });
    }
};

// Crear materia
const createMateria = (req, res) => {
    try {
        const { nombre, creditos, semestre, estado, descripcion } = req.body;
        
        if (!nombre || !creditos || !semestre) {
            return res.status(400).json({ error: "Faltan campos requeridos: nombre, créditos, semestre" });
        }
        
        const nuevoId = Math.max(...data.getAllMaterias().map(m => m.id), 0) + 1;
        
        const nuevaMateria = {
            id: nuevoId,
            nombre,
            creditos: parseInt(creditos),
            semestre: parseInt(semestre),
            estado: estado || "Activo",
            descripcion: descripcion || "",
            fechaCreacion: new Date().toISOString()
        };
        
        const materiaCreada = data.addMateria(nuevaMateria);
        return res.status(201).json({
            message: 'Materia creada exitosamente',
            materia: materiaCreada
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear la materia' });
    }
};

// Actualizar materia
const updateMateria = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const update = req.body;
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }
        
        if (!update || Object.keys(update).length === 0) {
            return res.status(400).json({ error: "No hay datos para actualizar" });
        }
        
        const materia = data.getMateriaById(id);
        if (!materia) {
            return res.status(404).json({ error: "Materia no encontrada" });
        }
        
        const materiaActualizada = data.updateMateria(id, update);
        return res.status(200).json({
            message: "Materia actualizada correctamente",
            materia: materiaActualizada
        });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar la materia' });
    }
};

// Eliminar materia
const deleteMateria = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }
        
        const materia = data.getMateriaById(id);
        if (!materia) {
            return res.status(404).json({ error: "Materia no encontrada" });
        }
        
        data.deleteMateria(id);
        return res.json({ mensaje: "Materia eliminada correctamente" });
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar la materia' });
    }
};

module.exports = {
    getAllMaterias,
    getMateriaById,
    getMateriasBySemestre,
    createMateria,
    updateMateria,
    deleteMateria
};
