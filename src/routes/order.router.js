const express = require('express');
const { getAll, create, update } = require('../controllers/order.controller');
const { verifyJwt } = require('../utils/verifyJWT');
const { verifyAdmin } = require('../utils/verifyAdmin');

const routerOrder = express.Router();

routerOrder.route('/')
    .get(verifyJwt, getAll)
    .post(verifyJwt, create)

routerOrder.route('/:id')
    .put(verifyJwt, verifyAdmin, update)

module.exports = routerOrder;