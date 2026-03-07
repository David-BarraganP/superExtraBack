// importaciones
const request = require("supertest")
const app = require('../app')

// definir las rutas
const BASE_URL = '/users'

// variables globales
let TOKEN 
let userId


// Objeto que representa un usuario 
const user = {
    userName: 'Alejandro',
    email: 'alejandro@gmail.com',
    password: 'alejandro1234',
    rol: 'colaborador'
}

// Se ejecuta antes de todos los tests
// Realiza un login para obtener un token válido
beforeAll(async()=>{
    const user = {
        email: "jose@gmail.com",
        password: "jose1234",
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    TOKEN = res.body.token
})


// Test para obtener  los usuarios
// Verifica que la respuesta sea 200 y que exista un usuario
test("Get -> 'BASE_URL/users', should return status code 200, res.body to be defined and res.body.length === 1", async () => {
    const res = await request(app)

        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`)



    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})


// Test para crear un  usuario
// Verifica que se cree correctamente y que el nombre coincida
test("Post -> 'BASE_URL', should return status code 201, and res.body to be defined and res.body.userName === user.userName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(user)

    userId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.userName).toBe(user.userName)
})


// Test para actualizar un usuario por su id
// Cambia el nombre y verifica que la actualización sea correcta
test("Put -> 'BASE_URL/:id', should return status code 200, res.body to be defined  and res.body.userName === 'Daniela'", async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${userId}`)
        .send({
            userName: "Daniela"
        })
        .set('Authorization', `Bearer ${TOKEN}`)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.userName).toBe("Daniela")
})


// Test para hacer login con el usuario creado
// Verifica que devuelva el email correcto y un token válido
test(`Post -> 'BASE_URL/login', should return status code 200, and res.body to be defined 
    and res.body.email === user.email,  res.body.token to be denined`, async () => {

    const userLogin = {
        email: 'alejandro@gmail.com',
        password: 'alejandro1234'
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(userLogin)


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()
})


// Test para login con contraseña incorrecta
// Verifica que devuelva error 401
test("POST -> 'URL_BASE/login', should return status code 401", async () => {
    const userLogin = {
      email: 'alejandro@gmail.com',
      password: 'invalid password'
    }
  
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send(userLogin)
  
    expect(res.statusCode).toBe(401)
  })
 

// Test para eliminar el usuario creado
// Verifica que la eliminación sea correcta (204)
  test("Delete -> 'URL_BASE/:id', should return status code 204", async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${userId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      
    expect(res.statusCode).toBe(204)
  })