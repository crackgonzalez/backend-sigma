// imports
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// configuracion express
const app = express();

// configuracion body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rutas
app.use(require('./routes/conductor'));

mongoose.connect(RUTA, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos online');
});

// iniciar el servidor
app.listen(PUERTO, () => {
    console.log(`Escuchando al puerto ${PUERTO}`);
});