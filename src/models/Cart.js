
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

// Definición del modelo cart (compra) 
const Cart = sequelize.define('cart', {
        quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
// userId
// productId
// sizeId
});

module.exports = Cart;