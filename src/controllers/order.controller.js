const catchError = require('../utils/catchError');
const { Order, User, Cart, Product, Size } = require('../models');

// Obtener todas las ordenes del usuario autenticado
const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const rol = req.user.rol

    const result = await Order.findAll({
        where: rol === 'admin' ? {} : { userId },
        include: [
            {
                model: User,
                attributes: ['userName']
            }
        ]
    })
    return res.json(result)
})

// Crear una orden desde el carrito
const create = catchError(async(req, res) => {
    const userId = req.user.id
    const { deliveryType, address, city, phone } = req.body

    // Obtener items del carrito
    const cart = await Cart.findAll({
        where: { userId },
        include: [{ model: Product }]
    })

    if (!cart.length) return res.sendStatus(404)

    // Calcular el total
    const total = cart.reduce((sum, item) => {
        return sum + (parseFloat(item.product.price) * item.quantity)
    }, 0)

    // Crear la orden
    const order = await Order.create({
        userId,
        deliveryType,
        address: deliveryType === 'delivery' ? address : null,
        city: deliveryType === 'delivery' ? city : null,
        phone,
        total,
        status: 'pending'
    })

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
    await Cart.destroy({ where: { userId } })

    return res.status(201).json(order)
})

// Actualizar estado de una orden (solo admin)
const update = catchError(async(req, res) => {
    const { id } = req.params
    const { status } = req.body
    const result = await Order.update(
        { status },
        { where: { id }, returning: true }
    )
    if (result[0] === 0) return res.sendStatus(404)
    return res.json(result[1][0])
})

module.exports = {
    getAll,
    create,
    update
}