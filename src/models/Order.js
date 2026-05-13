const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Order = sequelize.define('order', {
    status: {
        type: DataTypes.ENUM('pending', 'shipped', 'delivered', 'ready_pickup'),
        allowNull: false,
        defaultValue: 'pending'
    },
    deliveryType: {
        type: DataTypes.ENUM('delivery', 'pickup'),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paymentRef: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // userId
});

module.exports = Order;