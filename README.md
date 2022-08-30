## Proyecto Final:

Curso Backend - MERN Stack: aplicación de e-commerce

### Descripción:

Se deberá crear un `.env` para una ejecución local basado en el archivo `.env_example`

El proyecto puede ser visualizado ejecutando `npm start` en consola.

El mismo cuenta con un FrontEnd para revisar los siguientes puntos: 

- Registro de Usuario
- Login de Usuario
- Persistencia de session
- Vista de productos por categorias
- Carrito de compras
- Proceso de pedido
- Chat de soporte
- Panel de usuario
- Información del servidor

Con los fines de facilitar la prueba el proyecto consume datos precargados para el FrontEnd
### API Productos
#### Se podrán realizar pruebas mediante Postman.

Las mismas se encuentran en la carpeta `/postman` con el nombre `api.postman_collection.json`
### Chat
#### Prueba del chat

El usuario logueado puede realizar consultas en la sección de Front correspondiente al chat.

El administrador podrá responder mediante Postman.

La prueba se encuentra en la carpeta `/postman` con el nombre `Chatbot.postman_collection.json`
### Archivos

- El upload de archivos se realiza mediante `Multer`
- Se utilizó para el resize de imagenes `sharp`
- Se almacena localmente

(Debido a la ejecución en un servidor gratuito `heroku` los archivos serán borrados automáticamente.)

### Despliegue en servidor

Se realizó el Deploy en un servidor `heroku`

Podrá visualizar el sitio [aquí](https://vanoyen-ecommerce.herokuapp.com/)

### Base de datos

Se utilizan en el proyecto base de datos relacional y no relacional.

- MongoDb (Local y MongoDB Atlas)
- MySql (Remota para precarga de productos)
### FrontEnd

El mismo se encuentra desarrollado con

- HTML
- CSS (SASS)
- Framework Bootstrap
- Handlebars.js
### Aplicación

Basado en las siguientes tecnologías / librerías

- Node.js
- Express
- Mongoose
- Passport
- Bcrypt
- Dotenv
- Socket.io
- Log4js
- Multer
- Sharp
- Nodemailer
- Twilio
- Artillery