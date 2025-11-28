// Punto de entrada principal: inicia la BD y levanta el servidor
const app = require('./app');
const sequelize = require('./utils/connection');
require("./models")

const PORT = process.env.PORT || 8080;

const main = async () => {
    try {
        // Sincroniza los modelos con la base de datos
        sequelize.sync();
        console.log("DB connected");

        // Inicia el servidor en el puerto configurado
        app.listen(PORT);
        console.log(`👉 Server running on port ${PORT}`);
        console.log(`👉 Link http://localhost:${PORT}`);
    } catch (error) {
        console.log(error)
    }
}

main();

