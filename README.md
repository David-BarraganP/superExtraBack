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
```
Esto iniciará el servidor con Nodemon, que reiniciará automáticamente la aplicación cuando detecte cambios en el código.

## Modo de Producción

Para ejecutar el servidor en modo de producción, utiliza:
 
```
npm start
```

Este comando ejecutará la aplicación en un entorno de producción.
