const express = require('express');
const routerUser = require('./user.router');
const router = express.Router();

// colocar las rutas aquí 
//router.use('/name',routerName) example
router.use('/users',routerUser)


module.exports = router;