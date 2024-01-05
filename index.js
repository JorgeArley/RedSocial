require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

//crear servidor de express
const app = express();

//configurar cors
app.use(cors());

//lectura de body
app.use(express.json());

//base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log("servidor corriendo en puerto " + process.env.PORT)
})