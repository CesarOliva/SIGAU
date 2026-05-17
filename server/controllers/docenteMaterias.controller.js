const data = require('../data/docenteMaterias');

// Obtener todas las asignaciones
const getAllAsignaciones = async (req, res) => {
    try {
        const asignaciones = await data.getAllAsignaciones();
        return res.status(200).json(asignaciones);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener asignaciones' });
    }
};

// Obtener materias de un docente
const getMateriasDocente = async (req, res) => {
    try {
        const docenteId = parseInt(req.params.docenteId);
        
        if (isNaN(docenteId)) {
            return res.status(400).json({ error: 'ID de docente inválido' });
        }
        
        const materias = await data.getMateriasDocente(docenteId);
        return res.status(200).json(materias);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener materias del docente' });
    }
};

// Obtener docentes de una materia
const getDocentesMateria = async (req, res) => {
    try {
        const materiaId = parseInt(req.params.materiaId);
        
        if (isNaN(materiaId)) {
            return res.status(400).json({ error: 'ID de materia inválido' });
        }
        
        const docentes = await data.getDocentesMateria(materiaId);
        return res.status(200).json(docentes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener docentes de la materia' });
    }
};

// Asignar materia a docente
const asignarMateria = async (req, res) => {
    try {
        const { docenteId, materiaId } = req.body;
        
        if (!docenteId || !materiaId) {
            return res.status(400).json({ error: 'docenteId y materiaId son requeridos' });
        }
        
        const asignacion = await data.asignarMateria(docenteId, materiaId);
        return res.status(201).json({
            message: 'Materia asignada exitosamente',
            asignacion
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Error al asignar materia' });
    }
};

// Desasignar materia de docente
const desasignarMateria = async (req, res) => {
    try {
        const asignacionId = parseInt(req.params.asignacionId);
        
        if (isNaN(asignacionId)) {
            return res.status(400).json({ error: 'ID de asignación inválido' });
        }
        
        const result = await data.desasignarMateria(asignacionId);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Error al desasignar materia' });
    }
};

// Obtener materias disponibles para un docente
const getMateriasDisponibles = async (req, res) => {
    try {
        const docenteId = parseInt(req.params.docenteId);
        
        if (isNaN(docenteId)) {
            return res.status(400).json({ error: 'ID de docente inválido' });
        }
        
        const materias = await data.getMateriasDisponibles(docenteId);
        return res.status(200).json(materias);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener materias disponibles' });
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
