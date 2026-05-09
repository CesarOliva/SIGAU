const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// POST /api/usuarios - crear cualquier usuario (alumno, docente, admin)
router.post('/usuarios', usuarioController.createUsers);

// GET /api/usuarios/:id - obtiene a cualquier usuario por su id (alumno, docente, admin)
router.get('/usuarios/:id',usuarioController.showUser);

// GET /api/usuarios - obtiene a todos los usuarios (alumno, docente, admin)
router.get('/usuarios',usuarioController.showUsers);

// DELETE /api/usuarios/:id - elimina cualquier usuario (alumno, docente, admin)
router.delete('/usuarios/:id',usuarioController.deleteUser);

// POST /api/usuarios/:id - edita cualquier usuario (alumno, docente, admin)
router.put('/usuarios/:id',usuarioController.editUser);

router.get('/usuarios/next-id', usuarioController.getNextId);



// POST /api/login - Iniciar sesión
router.post('/login', usuarioController.login);

module.exports = router;