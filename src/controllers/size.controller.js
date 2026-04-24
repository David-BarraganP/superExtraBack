const catchError = require('../utils/catchError');
const Size = require('../models/Size');

// Obtener todas las tallas de un producto
const getAll = catchError(async(req, res) => {
    const {productId} = req.params;
    const results = await Size.findAll({ where: { productId } });
    return res.json(results);
});


// Crear una talla para un producto
const create = catchError(async(req, res) => {
    const {productId} = req.params;
    const {size, stock} = req.body;
    const result = await Size.create({size, stock, productId});
    return res.status(201).json(result);
});

// Eliminar una talla
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Size.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

// Actualizar stock de una talla
const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { stock } = req.body;
    const result = await Size.update(
        { stock },
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    remove,
    update
}