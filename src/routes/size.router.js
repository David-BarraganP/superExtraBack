const { getAll, create, remove, update } = require('../controllers/size.controller');
const express = require('express');
const { verifyJwt } = require('../utils/verifyJWT');
const { verifyAdmin } = require('../utils/verifyAdmin');

const routerSize = express.Router({ mergeParams: true });

// Obtener todas las tallas de un producto (público)
routerSize.route('/')
    .get(getAll)
    .post(verifyJwt, verifyAdmin, create)

// Actualizar o eliminar una talla (solo admin)
routerSize.route('/:id')
    .put(verifyJwt, verifyAdmin, update)
    .delete(verifyJwt, verifyAdmin, remove)

module.exports = routerSize;


