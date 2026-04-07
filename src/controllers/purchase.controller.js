const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const ProductImg = require('../models/ProductImg');


const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const result = await Purchase.findAll({
        where: {userId},
        attributes: { exclude: ["userId", "productId"] },
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
    const cart = await Cart.findAll({
        where: {userId},
        raw: true,
        attributes: ['quantity', 'userId', 'productId'] 
    })
    if (!cart) return sendStatus(404)

       const result = await Purchase.bulkCreate(cart)
       if(!result) return sendStatus(404)

        await Cart.destroy({ where : {userId}})


    return res.status(201).json(result)
})

module.exports = {
    getAll,
    create
}