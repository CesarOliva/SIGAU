const data = require('../data/estadisticas');

// Obtener dashboard de estadísticas
const getDashboard = (req, res) => {
    try {
        const estadisticas = data.getDashboard();
        return res.status(200).json(estadisticas);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
};

// Obtener alumnos por semestre
const getAlumnosPorSemestre = (req, res) => {
    try {
        const data_alumnos = data.getAlumnosPorSemestre();
        return res.status(200).json(data_alumnos);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener alumnos por semestre' });
    }
};

// Obtener evolución de calificaciones
const getEvolucionCalificaciones = (req, res) => {
    try {
        const calificaciones = data.getEvolucionCalificaciones();
        return res.status(200).json(calificaciones);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener evolución de calificaciones' });
    }
};

// Obtener rendimiento de materias
const getRendimientoMaterias = (req, res) => {
    try {
        const rendimiento = data.getRendimientoMaterias();
        return res.status(200).json(rendimiento);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener rendimiento de materias' });
    }
};

// Obtener rendimiento de una materia específica
const getRendimientoMateria = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }
        
        const rendimiento = data.getRendimientoMateria(id);
        
        if (!rendimiento) {
            return res.status(404).json({ error: "Materia no encontrada" });
        }
        
        return res.status(200).json(rendimiento);
    } catch (error) {
        return res.status(500).json({ error: 'Error al obtener rendimiento de materia' });
    }
};

module.exports = {
    getDashboard,
    getAlumnosPorSemestre,
    getEvolucionCalificaciones,
    getRendimientoMaterias,
    getRendimientoMateria
};
