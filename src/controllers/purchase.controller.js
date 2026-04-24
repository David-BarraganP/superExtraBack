const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const ProductImg = require('../models/ProductImg');
const Size = require('../models/Size');


const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const result = await Purchase.findAll({
        where: {userId},
        include: [
            {          
                model: User,
                attributes: ["userName"]
            },
            {
                model: Product,
                attributes: { exclude : ["createdAt", "updatedAt"]},
                include: [{
                model: Category,
                attributes:["name"]
                },
            {
                model: ProductImg
            }]
            }
        ]
    })
    return res.json(result)
});


const create = catchError(async(req, res) => {
    const userId = req.user.id

    // Obtener items del carrito con sizeId
    const cart = await Cart.findAll({
        where: {userId},
        raw: true,
        attributes: ['quantity', 'userId', 'productId', 'sizeId'] 
    })
    if (!cart.length) return res.sendStatus(404)

        // Crear las compras
       const result = await Purchase.bulkCreate(cart)
       if(!result) return res.sendStatus(404)

        // Descontar stock de cada talla
    for (const item of cart) {
        if (item.sizeId) {
            const size = await Size.findByPk(item.sizeId)
            if (size) {
                const newStock = size.stock - item.quantity
                await size.update({ stock: newStock < 0 ? 0 : newStock })
            }
        }
    }

         // Vaciar el carrito
        await Cart.destroy({ where : {userId}})

    return res.status(201).json(result)
})

module.exports = {
    getAll,
    create
}