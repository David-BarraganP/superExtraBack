// importaciones
const request = require("supertest")
const app = require("../app")

// definir rutas
const BASE_URL = '/categories'
const BASE_URL_USERS = '/users'

// Variables globales
let TOKEN
let categoryId


// Objeto que representa una categoría 
const category = {
    name: 'tenis niños'
}


// Se ejecuta antes de todos los tests
// Realiza login para obtener un token válido
beforeAll(async () => {
    const user  = {
        email: 'jose@gmail.com',
        password: 'jose1234',
    }

    const res = await request(app)
    .post(`${BASE_URL_USERS}/login`)
    .send(user)

    TOKEN = res.body.token
})


// Test para crear una nueva categoría
// Verifica que se cree correctamente y que el nombre coincida
test("POST -> 'BASE_URL',  should return status code 201, res.body to be defined and  res.body.name === category.name", async () => {
    const res = await request(app)
    .post(BASE_URL)
    .send(category)
    .set("Authorization",  `Bearer ${TOKEN}`)
     
    // Guarda el id de la categoría creada
    categoryId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
})


// Test para obtener todas las categorías
// Verifica que la respuesta sea 200 y que exista una categoría
test("GET -> 'BASE_URL/categories', should return status code 200, res.body to be defined and res.body to have lenght === 1", async() =>{
    const res = await request(app)
    .get(BASE_URL)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})


// Test para eliminar una categoría por su id
// Verifica que la eliminación sea correcta (204)
test("DELETE -> 'BASE_URL/:id', shoud return status code 204", async () =>{
    const res = await request(app)

    .delete(`${BASE_URL}/${categoryId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
 

})
 