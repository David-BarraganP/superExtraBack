const { getAll, getOne, create, remove, update } = require('../controllers/cart.controller');
const express = require('express');

const routerCart = express.Router();

// Rutas base del carrito:
routerCart.route('/')
    .get(getAll)
    .post(create);

    // Rutas con ID específico:
// DELETE /cart/:id -> elimina un item
// PUT    /cart/:id -> actualiza la cantidad
routerCart.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerCart;
