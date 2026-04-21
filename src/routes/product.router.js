// Router de productos: define las rutas y aplica middlewares como verifyJwt
const { getAll, create, getOne, remove, update, setImages } = require('../controllers/product.controller');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');
const { verifyAdmin } = require('../utils/verifyAdmin');

const routerProduct = express.Router();

// Rutas principales: obtener todos los productos y crear uno nuevo
// La creación requiere autenticación
routerProduct.route('/')
    .get(getAll)
    .post(verifyJwt, verifyAdmin, create);

// ruta para setear las imagenes
routerProduct.route('/:id/images')
    .post(verifyJwt, verifyAdmin, setImages)

// Rutas para manejar un producto individual (ID)
// Obtener, eliminar o actualizar; las últimas dos requieren autenticación
routerProduct.route('/:id')
    .get(getOne)
    .delete(verifyJwt, verifyAdmin, remove)
    .put(verifyJwt, verifyAdmin, update);

module.exports = routerProduct;
   