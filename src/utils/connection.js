// Importa la clase Sequelize para crear la conexión con la base de datos
// Carga las variables de entorno desde el archivo .env
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Crea una nueva instancia de Sequelize utilizando la URL de la base de datos
// que se encuentra en las variables de entorno
// logging: false evita que se muestren las consultas SQL en la consola
const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false })

module.exports = sequelize;