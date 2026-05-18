const express = require('express');
const router = express.Router();
const materiasController = require('../controllers/materias.controller');

// GET /api/materias - Obtener todas las materias
router.get('/materias', materiasController.getAllMaterias);

// GET /api/materias/semestre/:semestre - Obtener materias por semestre
router.get('/materias/semestre/:semestre', materiasController.getMateriasBySemestre);

// GET /api/materias/:id - Obtener materia por ID
router.get('/materias/:id', materiasController.getMateriaById);

// POST /api/materias - Crear materia
router.post('/materias', materiasController.createMateria);

// PUT /api/materias/:id - Actualizar materia
router.put('/materias/:id', materiasController.updateMateria);

// DELETE /api/materias/:id - Eliminar materia DEFINITIVAMENTE
router.delete('/materias/:id', materiasController.deleteMateria);

// ✅ NUEVAS RUTAS para cambio de estado
router.patch('/materias/:id/deactivate', materiasController.deactivateMateria);  // Desactivar
router.patch('/materias/:id/activate', materiasController.activateMateria);       // Reactivar

module.exports = router;