const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// GET /api/usuarios - Obtener todos los usuarios
router.get('/usuarios', usuarioController.getUsers);

// GET /api/usuarios/:id - Obtener usuario por ID
router.get('/usuarios/:id', usuarioController.getUserById);

// POST /api/usuarios - Crear cualquier usuario (alumno, docente, admin)
router.post('/usuarios', usuarioController.createUsers);

// PUT /api/usuarios/:id - Actualizar usuario
router.put('/usuarios/:id', usuarioController.editUser);

// DELETE /api/usuarios/:id - Eliminar usuario
router.delete('/usuarios/:id', usuarioController.deleteUser);

module.exports = router;