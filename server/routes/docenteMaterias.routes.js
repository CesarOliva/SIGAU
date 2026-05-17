const express = require('express');
const router = express.Router();
const docenteMaterialController = require('../controllers/docenteMaterias.controller');

// GET /api/asignaciones - Obtener todas las asignaciones
router.get('/asignaciones', docenteMaterialController.getAllAsignaciones);

// GET /api/asignaciones/docente/:docenteId - Obtener materias de un docente
router.get('/asignaciones/docente/:docenteId', docenteMaterialController.getMateriasDocente);

// GET /api/asignaciones/materia/:materiaId - Obtener docentes de una materia
router.get('/asignaciones/materia/:materiaId', docenteMaterialController.getDocentesMateria);

// GET /api/asignaciones/disponibles/:docenteId - Obtener materias no asignadas a un docente
router.get('/asignaciones/disponibles/:docenteId', docenteMaterialController.getMateriasDisponibles);

// POST /api/asignaciones - Asignar materia a docente
router.post('/asignaciones', docenteMaterialController.asignarMateria);

// DELETE /api/asignaciones/:asignacionId - Desasignar materia de docente
router.delete('/asignaciones/:asignacionId', docenteMaterialController.desasignarMateria);

module.exports = router;
