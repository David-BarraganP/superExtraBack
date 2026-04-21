const express = require('express');
const routerUser = require('./user.router');
const routerProduct = require('./product.router');
const routerCategory = require('./category.router');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const routerProductImg = require('./productImg.router');
const { verifyJwt } = require('../utils/verifyJWT');
const { verifyAdmin } = require('../utils/verifyAdmin');

const router = express.Router();

// colocar las rutas aquí 
// router.use('/name',routerName) example
router.use('/users',routerUser)
router.use('/products',routerProduct)
router.use('/categories',routerCategory)
router.use('/cart', verifyJwt,  routerCart) // rutas protegidas
router.use('/purchase', verifyJwt, routerPurchase)
router.use('/product_images', verifyAdmin, routerProductImg)


module.exports = router;

