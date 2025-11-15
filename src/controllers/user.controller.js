const catchError = require('../utils/catchError');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Obtiene todos los usuarios
const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

// Crea un nuevo usuario usando los datos del body
const create = catchError(async (req, res) => {
    const results = await User.create(req.body);
    return res.status(201).json({
    message: "Usuario creado correctamente",
    user: results
});
});

// Elimina un usuario por id
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await User.destroy({ where: { id } });
    if (!result) {
    return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ message: "Usuario eliminado correctamente" });
});

// Actualiza datos del usuario, evitando que email y password se modifiquen
const update = catchError(async (req, res) => {
    const { id } = req.params;
    delete req.body.email;     // Se bloquea la actualización de email
    delete req.body.password;  // Se bloquea la actualización de contraseña
    const result = await User.update(
    req.body,
    { where: { id }, returning: true }
);
    if (result[0] === 0) {
    return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({
    message: "Usuario actualizado correctamente",
    user: result[1][0]
    });
});

// Login: valida credenciales y genera token
const login = catchError(async(req, res) => {
    const { email, password } = req.body;

    const user  = await User.findOne({where: {email}});
    if(!user) return res.status(401).json({ error: 'credenciales invalidas' }); // Usuario no existe

    const isValid = await bcrypt.compare(password, user.password); // Compara contraseñas
    if(!isValid) return res.status(401).json({ error: 'credenciales invalidas' }); // Contraseña incorrecta

    const token = jwt.sign(
        {user},                        // Contenido del token
        process.env.TOKEN_SECRET,      // Clave secreta
        { expiresIn: "1d" }            // Tiempo de expiración
    );

    return res.json({
        message: "Login exitoso",
        data: user, token              // Devuelve usuario + token
    });
});

module.exports = {
    getAll,
    create,
    remove,
    update,
    login
}
