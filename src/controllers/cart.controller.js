//importaciones
const catchError = require('../utils/catchError');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');



// Obtiene todos los items del carrito del usuario autenticado,
// incluyendo info del producto y su categoría (sin timestamps)

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const results = await Cart.findAll({
        where: {userId},
        include:[
            {
                model: Product,
                attributes: { exclude : ["createdAt", "updatedAt"]},
                include:[
                    {
                        model: Category, 
                        attributes:['name'] 
                },
                {
                    model: ProductImg
                }
            ]
            }
        ]
    });
    return res.json(results);
});

const getOne = catchError(async(req, res) => {
    const {id} = req.params
    const userId = req.user.id
    const results = await Cart.findByPk(id, {
        where: {userId},
        include:[
            {
                model: Product,
                attributes: { exclude : ["createdAt", "updatedAt"]},
                include:[
                    {
                        model: Category, 
                        attributes:['name'] 
                },
                {
                     model: ProductImg
                }
            ]
            }
        ]
    });
    return res.json(results);
});

// Agrega un producto al carrito tomando userId del token,
// y quantity + productId del body
const create = catchError(async(req, res) => {

    const userId = req.user.id
    const { quantity, productId} = req.body
    const newBody = {userId, quantity, productId}
    const result = await Cart.create(newBody);
    return res.status(201).json(result);
});

// Elimina un item del carrito por id, validando que pertenezca
// al usuario autenticado. Retorna 404 si no existe
const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id
    const result = await Cart.destroy({ where:{id, userId} });
    if(!result) return res.sendStatus(404);
    return res.sendStatus(204);
});

// Actualiza la cantidad de un item del carrito.
// Verifica que el item exista y pertenezca al usuario antes de actualizar
const update = catchError(async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id
    const {quantity} = req.body
    const result = await Cart.update(
        {quantity},
        { where: {id, userId}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    getOne,
    create,
    remove,
    update
}
