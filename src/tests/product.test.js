// importaciones
const request = require("supertest")
const app = require('../app')
const Category = require('../models/Category')
require('../models')



// definicion de las rutas
const BASE_URL = '/products'
const BASE_URL_USERS = '/users/login'

// Variables globales para reutilizar datos entre los tests
let productId
let TOKEN
let category
let product


// Se ejecuta antes de todos los tests
// Aquí se obtiene el token de autenticación y se crean los datos iniciales
beforeAll(async()=>{
    const user = {
        email: 'jose@gmail.com',
        password: 'jose1234'
    }

     const res = await request(app)
    .post(BASE_URL_USERS)
    .send(user)

    TOKEN = res.body.token

    const categoryBody = {
        name:"Zapatillas"
    }

    category = await Category.create(categoryBody)

     product = {
        title: "teni",
         description: "runer",
         price: "1000000",
         categoryId:category.id
        }
    
})


// Test para crear un producto
// Verifica que el producto se cree correctamente
   test("Post -> 'BASE_URL', should return status code 201, and res.body to be defined, and res.body.title === product.title", async () => {
    const res = await request(app)

        .post(BASE_URL)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

        productId = res.body.id

 

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

    
})


// Test para obtener todos los productos
// Verifica que el producto devuelto tenga su categoría asociada
test(`Get -> 'BASE_URL/products', should return status code 200, res.body to be defined and res.body.length === 1, 
    res.body[0].category to be defined, and res.body[0].category.id === category.id`, async () =>{
    const res = await request(app)

    .get(BASE_URL)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)

    
})

// test del filter
// Test para filtrar productos por categoría, por query  ?category=#id
test(`get -> 'BASE_URL', should return status code 200, res.body to be defiden,  res.body.length === 1, 
    res.body[0].categoryId === category.id, and res.body[0].category.id === category.id`, async () => {
    const res = await request(app)
    
    .get(`${BASE_URL}?category=${category.id}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    
    expect(res.body[0].categoryId).toBeDefined()
    expect(res.body[0].categoryId).toBe(category.id)
    
    expect(res.body[0].category).toBeDefined()
    expect(res.body[0].category.id).toBe(category.id)


})    

// Test para obtener un producto por su id
// Verifica que el producto devuelto incluya su categoría
test(`get -> 'BASE_URL', should return status code 200, res.body to be defined, and res.body.title === product.title, 
    res.body.category.id to be defined, and res.body.category.id === category.id`, async () => {
    const res = await request(app)
    
    .get(`${BASE_URL}/${productId}`)

    
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
    
    expect(res.body.category.id).toBeDefined()
    expect(res.body.category.id).toBe(category.id)
    
   
})

// Test para actualizar el título del producto
// Verifica que el cambio se guarde correctamente
test(`Put -> 'Base_url/producId', should return status code 200,  res.body to be defined and res.body.title 
    === 'calzado de gala'`, async () => {
        const res = await request(app)

        .put(`${BASE_URL}/${productId}`)
        .send({
            title: "calzado de gala"
        })
        .set('Authorization', `Bearer ${TOKEN}`)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body.title).toBe("calzado de gala")

        

    })


// Test para eliminar el producto
// Verifica que la eliminación devuelva código 204
    test("Delete -> 'BASE_URL/:productId', should return status code 204", async () => {
        const res = await request(app)

        .delete(`${BASE_URL}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)

        expect(res.statusCode).toBe(204)

        // Elimina  la categoría creada para limpiar la base de datos
        // se realiza en cada test 
        await category.destroy()

    })
    