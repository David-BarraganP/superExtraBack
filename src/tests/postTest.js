// Importa la conexión configurada con la base de datos
// Importa todos los modelos para que Sequelize los registre antes de sincronizar
const sequelize = require('../utils/connection');
require('../models');

// Función asíncrona encargada de reiniciar la base de datos
const testMigrate = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('DB reset ✅');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

testMigrate();