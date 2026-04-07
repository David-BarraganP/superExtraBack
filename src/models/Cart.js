
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

// Definición del modelo Purchase (compra) 
const Cart = sequelize.define('cart', {
        quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

// userId
// productId
});

module.exports = Cart;