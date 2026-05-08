const express= require('express');
const router = express.Router();
const asignaturasController = require('../controllers/asignaturas.controller');

// POST /api/asignatura - crear una asignatura
router.post('/asignatura', asignaturasController.createAsignatura);
// GET /api/asignatura - trae las asignaturas 
router.get('/asignatura',asignaturasController.getAsignaturas);
// DELETE /api/usuarios - elimina la asignatura
router.delete('/asignatura/:id',asignaturasController.deleteAsignatura);
// PUT /api/usuarios - edita cualquier asignatura
router.put('/asignatura/:id',asignaturasController.editAsignatura);

module.exports=router;