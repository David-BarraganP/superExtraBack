# 🚀 superExtraBack — Servidor Express

Este proyecto es un servidor básico con **Express.js** preparado para servir contenido web estático y exponer rutas API.  
Ideal como punto de partida para aplicaciones backend con Node.js.

---

## 🧩 Librerías principales

* **jsonwebtoken** (9.0.2): Se utiliza principalmente para autenticación y autorización en aplicaciones

* **bcrypt** (6.0.0): instalada como libreria para encriptacion de contraseñas.

* **cors** (v2.8.5): Middleware para permitir solicitudes HTTP desde diferentes dominios.

* **dotenv** (v17.2.3): Carga variables de entorno desde un archivo .env.

* **express** (v5.1.0): Marco web minimalista para la construcción de aplicaciones web y API.

* **helmet** (v8.1.0): Middleware que ayuda a proteger las aplicaciones Express configurando varios encabezados HTTP.

* **pg** (v8.16.3): Controlador de PostgreSQL para Node.js.

* **pg-hstore** (v2.3.4): Serializador/deserializador para datos JSON y hstore en PostgreSQL.

* **sequelize** (v6.37.7): ORM para interactuar con bases de datos relacionales.



> Opcionalmente, puedes agregar **Sequelize**, **pg**, o cualquier ORM si decides conectar una base de datos más adelante.

---

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/David-BarraganP/superExtraBack.git
cd superExtraBack

### Modo de Desarrollo

Para ejecutar el servidor en modo de desarrollo, utiliza:
previemente instalado : npm install nodemon --save-dev

```
npm run dev
nodemon --legacy-watch src/server.js
```
Esto iniciará el servidor con Nodemon, que reiniciará automáticamente la aplicación cuando detecte cambios en el código.

## Modo de Producción

Para ejecutar el servidor en modo de producción, utiliza:
 
```
npm start
```

Este comando ejecutará la aplicación en un entorno de producción.

## 🧩 Tecnologías y dependencias

| Paquete | Versión | Uso |
|---|---|---|
| express | 5.1.0 | Framework HTTP |
| sequelize | 6.37.7 | ORM para PostgreSQL |
| sequelize-cli | 6.6.5 | Migraciones y seeders |
| pg / pg-hstore | 8.16.3 / 2.3.4 | Driver PostgreSQL |
| bcrypt | 6.0.0 | Encriptación de contraseñas |
| jsonwebtoken | 9.0.2 | Autenticación JWT |
| cloudinary | 2.9.0 | Almacenamiento de imágenes |
| multer | 2.1.1 | Manejo de archivos multipart |
| helmet | 8.1.0 | Headers de seguridad HTTP |
| cors | 2.8.5 | Cross-Origin Resource Sharing |
| dotenv | 17.2.3 | Variables de entorno |
| **jest** | 29.7.0 | Framework de testing |
| **supertest** | 7.2.2 | Testing de endpoints HTTP |
| **nodemon** | 3.1.11 | Recarga automática en desarrollo |

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/David-BarraganP/superExtraBack.git
cd superExtraBack
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```env
DATABASE_URL=postgres://usuario:contraseña@host:5432/nombre_bd
TOKEN_SECRET=tu_clave_secreta_jwt
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
PORT=8080
```

---

## 🚀 Scripts disponibles

```bash
npm run dev      # Servidor en desarrollo con nodemon (hot-reload)
npm start        # Producción: ejecuta migraciones y levanta el servidor
npm test         # Tests: resetea BD → ejecuta Jest → limpia BD
npm run migrate  # Ejecuta migraciones pendientes manualmente
npm run reset:migrate  # Resetea y vuelve a migrar (usado en tests)
npm run reset:db       # Limpia la BD después de los tests
```

---

## 🗺 Rutas de la API

### Usuarios — `/users`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/users` | Obtiene todos los usuarios | 🔒 JWT |
| POST | `/users` | Crea un nuevo usuario | Público |
| POST | `/users/login` | Inicia sesión, devuelve token | Público |
| PUT | `/users/:id` | Actualiza usuario (sin email/password) | 🔒 JWT |
| DELETE | `/users/:id` | Elimina un usuario | 🔒 JWT |

### Productos — `/products`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/products` | Lista todos los productos | Público |
| GET | `/products/:id` | Obtiene un producto por ID | Público |
| POST | `/products` | Crea un producto | 🔒 JWT + Admin |
| PUT | `/products/:id` | Actualiza un producto | 🔒 JWT + Admin |
| DELETE | `/products/:id` | Elimina un producto | 🔒 JWT + Admin |
| POST | `/products/:id/images` | Asocia imágenes a un producto | 🔒 JWT + Admin |

### Categorías — `/categories`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/categories` | Lista todas las categorías | Público |
| POST | `/categories` | Crea una categoría | 🔒 JWT |
| DELETE | `/categories/:id` | Elimina una categoría | 🔒 JWT |

### Carrito — `/cart`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/cart` | Obtiene los ítems del carrito del usuario | 🔒 JWT |
| GET | `/cart/:id` | Obtiene un ítem específico | 🔒 JWT |
| POST | `/cart` | Agrega un producto al carrito | 🔒 JWT |
| PUT | `/cart/:id` | Actualiza la cantidad | 🔒 JWT |
| DELETE | `/cart/:id` | Elimina un ítem del carrito | 🔒 JWT |

### Órdenes — `/orders`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/orders` | Lista las órdenes del usuario | 🔒 JWT |
| POST | `/orders` | Crea una orden (checkout) | 🔒 JWT |
| PUT | `/orders/:id` | Actualiza el estado de la orden | 🔒 JWT + Admin |

### Compras — `/purchase`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/purchase` | Lista las compras del usuario | 🔒 JWT |
| POST | `/purchase` | Registra una compra | 🔒 JWT |

### Tallas — `/products/:productId/sizes`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| GET | `/` | Lista tallas de un producto | Público |
| POST | `/` | Crea una talla | 🔒 JWT + Admin |
| PUT | `/:id` | Actualiza una talla | 🔒 JWT + Admin |
| DELETE | `/:id` | Elimina una talla | 🔒 JWT + Admin |

### Imágenes — `/product_images`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| POST | `/product_images` | Sube imágenes a Cloudinary | 🔒 JWT + Admin |

---

## 🗄 Modelos y relaciones

```
User         ──< Cart         (hasMany / belongsTo)
User         ──< Purchase     (hasMany / belongsTo)
User         ──< Order        (hasMany / belongsTo)
Category     ──< Product      (hasMany / belongsTo)
Product      ──< Cart         (hasMany / belongsTo)
Product      ──< Purchase     (hasMany / belongsTo)
Product      ──< ProductImg   (hasMany / belongsTo)
Product      ──< Size         (hasMany / belongsTo)
Size         ──< Cart         (hasMany / belongsTo)
```

### Modelo `Order` (migración explícita)

```
id            INTEGER PK autoIncrement
status        ENUM('pending', 'shipped', 'delivered', 'ready_pickup')  default: 'pending'
deliveryType  ENUM('delivery', 'pickup')
address       STRING nullable
city          STRING nullable
phone         STRING
total         DECIMAL(10,2)
paymentRef    STRING nullable
userId        INTEGER FK → users.id
createdAt     DATE
updatedAt     DATE
```

---

## 🔐 Seguridad y autenticación

### Contraseñas — bcrypt

Las contraseñas se encriptan automáticamente antes de persistirse mediante un hook `beforeCreate` del modelo `User` con un salt de 10 rondas. El método `toJSON()` del modelo elimina el campo `password` de todas las respuestas.

```js
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});
```

### Tokens — JWT

Al hacer login se emite un token JWT firmado con `TOKEN_SECRET` y expiración de **1 día**. Debe enviarse en el header de cada petición protegida:

```
Authorization: Bearer <token>
```

### Middleware `verifyJWT`

Valida la firma y vigencia del token. Extrae el payload y lo adjunta en `req.user`.

### Middleware `verifyAdmin`

Verifica que `req.user.rol === 'admin'`. Se encadena después de `verifyJWT` en las rutas de administración.

---

## 🧪 Tests

El proyecto incluye **7 suites** de integración usando Jest + Supertest. Los tests se ejecutan contra la base de datos real con un ciclo controlado:

```
npm run reset:migrate  →  Jest (todas las suites)  →  npm run reset:db
```

| Suite | Casos cubiertos |
|---|---|
| `user.test.js` | GET todos, POST crear, PUT actualizar, POST login correcto, POST login 401, DELETE |
| `product.test.js` | CRUD completo de productos |
| `cart.test.js` | Crear ítem, listar, obtener por ID, actualizar cantidad, eliminar |
| `order.test.js` | Crear orden, listar, actualizar estado |
| `purchase.test.js` | Registrar y listar compras |
| `size.test.js` | CRUD de tallas por producto |
| `category.test.js` | Crear, listar y eliminar categorías |

---

## 📦 Variables de entorno requeridas

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | URL de conexión a PostgreSQL |
| `TOKEN_SECRET` | Clave secreta para firmar JWT |
| `CLOUDINARY_CLOUD_NAME` | Nombre del cloud en Cloudinary |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary |
| `PORT` | Puerto del servidor (default: 8080) |
