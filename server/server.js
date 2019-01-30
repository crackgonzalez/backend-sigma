// imports
require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');

// configuracion express
const app = express();

// configuracion body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rutas
app.get('/conductor', (req, res) => {
    res.json('Get Conductor');
});

app.post('/conductor', (req, res) => {
    let body = req.body;
    res.json({ body });
});

app.put('/conductor/:id', (req, res) => {

    let id = req.params.id;

    res.json({ id });
});

app.delete('/conductor/:id', (req, res) => {
    res.json('Delete Conductor')
});

// iniciar el servidor
app.listen(PUERTO, () => {
    console.log(`Escuchando al puerto ${PUERTO}`);
});