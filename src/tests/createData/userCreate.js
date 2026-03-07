// Importa el modelo User para poder interactuar con la tabla de usuarios
const User = require('../../models/User')

// Función asíncrona que crea un usuario en la base de datos
// Este usuario se utiliza para realizar los tests
const userCreate = async () =>{

    await User.create(
    {
        userName: 'Jose',
        email: 'jose@gmail.com',
        password: 'jose1234',
        rol: 'admin'

    }
    )


}


module.exports = userCreate