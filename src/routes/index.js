const express = require('express');
const routerUser = require('./user.router');
const routerProduct = require('./product.router');
const routerCategory = require('./category.router');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const routerProductImg = require('./productImg.router');
const { verifyJwt } = require('../utils/verifyJWT');
const { verifyAdmin } = require('../utils/verifyAdmin');
const routerSize = require('./size.router');

const router = express.Router();

// colocar las rutas aquí 
// router.use('/name',routerName) example
router.use('/users',routerUser)
router.use('/products/:productId/sizes', routerSize)
router.use('/products',routerProduct)
router.use('/categories',routerCategory)
router.use('/cart', verifyJwt,  routerCart) // rutas protegidas
router.use('/purchase', verifyJwt, routerPurchase)
router.use('/product_images', verifyJwt, verifyAdmin, routerProductImg)



module.exports = router;

