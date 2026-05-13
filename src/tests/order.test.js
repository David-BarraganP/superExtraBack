require('../models')
const request = require('supertest')
const app = require('../app')
const { User, Cart, Product } = require('../models')


const BASE_URL = '/orders'
const URL_USER = '/users/login'

let TOKEN
let orderId

beforeAll(async () => {
    // inicio de sesion con usuario client
    const userLogin = {
        email: 'jose@gmail.com',
        password: 'jose1234'
    }

    const res = await request(app)
        .post(URL_USER)
        .send(userLogin)

    TOKEN = res.body.token

    // ontener el usuario
      user = await User.findOne({ where: { email: 'jose@gmail.com' } })

          // crear producto de prueba
    product = await Product.create({
        title: 'Zapato de prueba',
        description: 'descripcion de prueba',
        price: 49.99
    })

        // agregar producto al carrito
    await Cart.create({
        userId: user.id,
        productId: product.id,
        quantity: 1
    })


})

test("POST -> 'BASE_URL', should return status code 201, res.body to be defined, res.body.status === 'pending'", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send({
            deliveryType: 'delivery',
            address: 'Calle 123',
            city: 'Bogotá',
            phone: '3001234567'
        })
        .set('Authorization', `Bearer ${TOKEN}`)

    orderId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.status).toBe('pending')
    expect(res.body.deliveryType).toBe('delivery')
})

test("GET -> '/BASE_URL', should return status code 200, res.body to be defined and res.body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].status).toBe('pending')

    
})

test("PUT -> '/BASE_URL/:id', should return status code 200, res.body to be defined and res.body.status === 'shipped'", async () => {
    // Para el PUT necesitamos token admin
   const res = await request(app)
   
        .put(`${BASE_URL}/${orderId}`)
        .send({ status: 'shipped' })
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.status).toBe('shipped')

    await product.destroy()
})