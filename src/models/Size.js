const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Size = sequelize.define('size', {
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
        stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    // productId
});

module.exports = Size;