// imports
const express = require('express');

// configuracion express
const app = express();

// rutas
app.use(require('./usuario'));
app.use(require('./login'));

module.exports = app;