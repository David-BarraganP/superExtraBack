// Modelo "Category": define una tabla con un solo campo obligatorio y único (name)
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,   // El nombre no puede estar vacío
        unique: true        // Evita categorías repetidas
    },
});

module.exports = Category;
