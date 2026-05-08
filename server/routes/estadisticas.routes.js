const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticas.controller');

// GET /api/estadisticas/dashboard - Obtener dashboard de estadísticas
router.get('/estadisticas/dashboard', estadisticasController.getDashboard);

// GET /api/estadisticas/alumnos-por-semestre - Obtener alumnos por semestre
router.get('/estadisticas/alumnos-por-semestre', estadisticasController.getAlumnosPorSemestre);

// GET /api/estadisticas/evolucion-calificaciones - Obtener evolución de calificaciones
router.get('/estadisticas/evolucion-calificaciones', estadisticasController.getEvolucionCalificaciones);

// GET /api/reportes/rendimiento-materias - Obtener rendimiento de todas las materias
router.get('/reportes/rendimiento-materias', estadisticasController.getRendimientoMaterias);

// GET /api/reportes/rendimiento-materias/:id - Obtener rendimiento de una materia específica
router.get('/reportes/rendimiento-materias/:id', estadisticasController.getRendimientoMateria);

module.exports = router;
