require('../models')
const request = require('supertest')
const app = require('../app')
const Product = require('../models/Product')



const BASE_URL= '/products'
const URL_USER = '/users/login'

let TOKEN
let product
let sizeId
let productId

beforeAll(async () => {
    // inicio de sesion
    const user = {
        email: 'jose@gmail.com',
        password: 'jose1234'
    }

    const res = await request(app)
        .post(URL_USER)
        .send(user)

    TOKEN = res.body.token



    product = await Product.create({
        title: 'Zapato de prueba',
        description: 'descripcion de prueba',
        price: 49.99
    })

})

test("POST -> '/BASE_URL/:productId/sizes', should return status code 201, res.body to be defined, res.body.size === 35 and res.body.stock === 10", async () => {
    const res = await request(app)
        .post(`${BASE_URL}/${ product.id }/sizes`)
        .send({ size: 35, stock: 10 })
        .set('Authorization', `Bearer ${TOKEN}`)

    sizeId = res.body.id

    productId = product.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.size).toBe(35)
    expect(res.body.stock).toBe(10)
    expect(res.body.productId).toBe(product.id)


})

test("GET -> '/BASE_URL/:productId/size', should return status code 200, res.body to be defined and res.body.length === 1", async () => {
    const res = await request(app)

     .get(`${BASE_URL}/${ productId }/sizes`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].size).toBe(35)
    expect(res.body[0].stock).toBe(10)
    expect(res.body[0].productId).toBe(product.id)
    

})

test("PUT -> '/BASE_URL:productId/size/:id', should return status code 200, res.body to be defined and res.body.stock === 20", async () => {
    const res = await request(app)

    .put(`${BASE_URL}/${ productId }/sizes/${sizeId}`)
    .send({stock: 20})
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.stock).toBe(20)

     
})

test("DELETE -> 'BASE_URL/:productId/size/:id',should return status code 204", async () => {
   const res = await request(app)

   .delete(`${BASE_URL}/${ productId }/sizes/${sizeId}`)
   .set('Authorization', `Bearer ${TOKEN}`)

   expect(res.statusCode).toBe(204)

   await product.destroy()

})