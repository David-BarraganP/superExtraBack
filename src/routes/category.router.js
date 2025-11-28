// Router de categorías: gestiona lectura, creación y eliminación
const { getAll, create, remove } = require('../controllers/category.controller');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerCategory = express.Router();

// Rutas principales: obtener todas las categorías y crear una nueva
// La creación requiere autenticación
routerCategory.route('/')
    .get(getAll)
    .post(verifyJwt, create);

// Ruta para eliminar una categoría; requiere autenticación
routerCategory.route('/:id')
    .delete(verifyJwt, remove)

module.exports = routerCategory;
