const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// POST /api/usuarios - crear cualquier usuario (alumno, docente, admin)
router.post('/usuarios', usuarioController.createUsers);

// GET /api/usuarios/:id - obtiene a cualquier usuario por su id (alumno, docente, admin)
router.get('/usuarios/:id',usuarioController.showUser);

// GET /api/usuarios/:id - obtiene a todos los usuarios (alumno, docente, admin)
router.get('/usuarios',usuarioController.showUsers);

// DELETE /api/usuarios - elimina cualquier usuario (alumno, docente, admin)
router.delete('/usuarios/:id',usuarioController.deleteUser);

// POST /api/usuarios - edita cualquier usuario (alumno, docente, admin)
router.put('/usuarios/:id',usuarioController.editUser);



module.exports = router;