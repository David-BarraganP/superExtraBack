// Controlador para gestionar categorías: obtener todas, crear y eliminar
const catchError = require('../utils/catchError');
const Category = require('../models/Category');

// Obtiene todas las categorías
const getAll = catchError(async (req, res) => {
    const results = await Category.findAll();
    return res.json(results);
});

// Crea una nueva categoría usando los datos del body
const create = catchError(async (req, res) => {
    const result = await Category.create(req.body);
    return res.status(201).json(result);
});

// Elimina una categoría por su ID; devuelve 404 si no existe
const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Category.destroy({ where: { id } });
    if (!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

// Exporta las funciones del controlador
module.exports = {
    getAll,
    create,
    remove
}
