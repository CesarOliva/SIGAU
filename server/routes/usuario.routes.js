const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Rutas existentes
router.post('/usuarios', usuarioController.createUsers);
router.get('/usuarios/:id', usuarioController.showUser);
router.get('/usuarios', usuarioController.showUsers);
router.delete('/usuarios/:id', usuarioController.deleteUser);
router.put('/usuarios/:id', usuarioController.editUser);
router.get('/usuarios/next-id', usuarioController.getNextId);
router.post('/login', usuarioController.login);

// ✅ NUEVAS RUTAS para cambio de estado
router.patch('/usuarios/:id/deactivate', usuarioController.deactivateUser);  // Desactivar
router.patch('/usuarios/:id/activate', usuarioController.activateUser);       // Reactivar

module.exports = router;