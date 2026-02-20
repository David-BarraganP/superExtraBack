const User = require('../../models/User')

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