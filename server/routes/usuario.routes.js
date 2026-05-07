const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// POST /api/usuarios - Crear cualquier usuario (alumno, docente, admin)
router.post('/usuarios', usuarioController.createUsers);
router.delete('/usuarios/:id',usuarioController.deleteUser);
router.post('/usuarios/:id',usuarioController.editUser);

module.exports = router;