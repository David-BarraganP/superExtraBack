const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt = require('bcrypt')

// Definición del modelo User con Sequelize
const User = sequelize.define('user', {

    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // El email debe ser único
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false // La contraseña no puede ser nula
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false // Rol obligatorio
    },
});

// Método que elimina la contraseña al devolver datos del usuario
User.prototype.toJSON = function () {
    const values = { ...this.get() };
    delete values.password; // Evita exponer la contraseña en respuestas
    return values;
};

// Hook que encripta la contraseña antes de crear el usuario
User.beforeCreate(async(user)=>{
    const password = user.password;
    const hashPassword = await bcrypt.hash(password, 10); // Encriptación con salt 10
    user.password = hashPassword; // Se reemplaza la contraseña original por el hash
});

module.exports = User;
