//Importación de modulos
const express = require('express');
require('dotenv').config();
require('colors')
const { dbConnection } = require('./db/db');

// Inicialización de del servidor
const app = express();

//Configuración de los middlewares
app.use(express.json());


//Iniciando la conexión con la base de datos
dbConnection();



//Creando ruta principal
//Configuración de las rutas
app.use('/api', require('./routes/users.routes'));
app.use('/api', require('./routes/index.routes'));


//Escuchando el servidor
app.listen(process.env.PORT || 3000, () => {
    console.log(`SERVER RUNNIGN ON PORT ${process.env.PORT || 3000}`.bgMagenta.gray);
});