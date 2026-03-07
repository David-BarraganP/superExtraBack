// Importa la conexión configurada con la base de datos
// Importa la función que crea el usuario inicial para los tests
// Importa todos los modelos para que Sequelize los registre
const sequelize = require('../utils/connection');
const userCreate = require('./createData/userCreate');
require('../models')

// Función asíncrona que reinicia la base de datos
const testMigrate = async () => {

    try {
        // Sincroniza los modelos con la base de datos
        // force: true elimina y vuelve a crear todas las tablas
        await sequelize.sync({ force: true })
        console.log('DB reset ✅');
        await userCreate()
        process.exit()
    } catch (error) {
        console.error(error);
    }
}

testMigrate() 