const data = require('../data/estadisticas');

// Obtener dashboard de estadísticas
const getDashboard = async (req, res) => {
    try {
        const estadisticas = await data.getDashboard();
        return res.status(200).json(estadisticas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
};

// Obtener alumnos por semestre
const getAlumnosPorSemestre = async (req, res) => {
    try {
        const data_alumnos = await data.getAlumnosPorSemestre();
        return res.status(200).json(data_alumnos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener alumnos por semestre' });
    }
};

// Obtener evolución de calificaciones
const getEvolucionCalificaciones = async (req, res) => {
    try {
        const calificaciones = await data.getEvolucionCalificaciones();
        return res.status(200).json(calificaciones);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener evolución de calificaciones' });
    }
};

// Obtener rendimiento de materias
const getRendimientoMaterias = async (req, res) => {
    try {
        const rendimiento = await data.getRendimientoMaterias();
        return res.status(200).json(rendimiento);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener rendimiento de materias' });
    }
};

// Obtener rendimiento de una materia específica
const getRendimientoMateria = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: "Id inválido" });
        }
        
        const rendimiento = await data.getRendimientoMateria(id);
        
        if (!rendimiento) {
            return res.status(404).json({ error: "Materia no encontrada" });
        }
        
        return res.status(200).json(rendimiento);
    } catch (error) {
        console.error(error);
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
