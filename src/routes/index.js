const express = require('express');
const routerUser = require('./user.router');
const routerProduct = require('./product.router');
const routerCategory = require('./category.router');
const routerCart = require('./cart.router');
const { verifyJwt } = require('../utils/verifyJWT');
const router = express.Router();

// colocar las rutas aquí 
//router.use('/name',routerName) example
router.use('/users',routerUser)
router.use('/products',routerProduct)
router.use('/categories',routerCategory)
router.use('/cart', verifyJwt,  routerCart) // rutas protegidas


module.exports = router;

