// Router de productos: define las rutas y aplica middlewares como verifyJwt
const { getAll, create, getOne, remove, update } = require('../controllers/product.controller');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');

const routerProduct = express.Router();

// Rutas principales: obtener todos los productos y crear uno nuevo
// La creación requiere autenticación
routerProduct.route('/')
    .get(getAll)
    .post(verifyJwt, create);

// Rutas para manejar un producto individual (ID)
// Obtener, eliminar o actualizar; las últimas dos requieren autenticación
routerProduct.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerProduct;
