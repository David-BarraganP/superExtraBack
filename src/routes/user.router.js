const { getAll, create, remove, update, login } = require('../controllers/user.controller');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerUser = express.Router();

// Ruta principal de usuarios:
// GET protegido por JWT -> obtiene todos los usuarios
// POST público -> crea un nuevo usuario
routerUser.route('/')
    .get(verifyJwt, getAll)
    .post(create);

// Ruta para iniciar sesión
routerUser.route('/login')
    .post(login)

// Rutas para manejar un usuario específico por ID:
// DELETE protegido -> elimina usuario
// PUT protegido -> actualiza usuario
routerUser.route('/:id')
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerUser;
