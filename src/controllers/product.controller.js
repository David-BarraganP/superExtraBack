// Controlador de productos: maneja filtros, creación, obtención, actualización y eliminación
const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');
// const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {

    // Permite filtrar productos por categoría usando query params
    const {category} = req.query

    const where = {}
    if(category) where.categoryId = category

    // Obtiene todos los productos, incluyendo su categoría
    const results = await Product.findAll( {
        include: [Category],
        where
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    // Crea un producto nuevo con los datos enviados en el body
    const result = await Product.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    // Busca un producto por ID e incluye su categoría
    const { id } = req.params;
    const result = await Product.findByPk(id, {include: [Category]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    // Elimina un producto por ID; si no existe, devuelve 404
    const { id } = req.params;
    const result = await Product.destroy({ where: {id} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    // Actualiza un producto por ID y devuelve el registro modificado
    const { id } = req.params;
    const result = await Product.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

// Código futuro: asignar imágenes al producto
// const setImages = ...

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
    // setImages
}
