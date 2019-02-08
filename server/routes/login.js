// imports
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/usuario');

// configuracion express
const app = express();

// iniciar sesion
app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: "Email incorrecto"
                }
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    mensaje: "Contraseña incorrecta"
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, SEED, { expiresIn: CADUCIDAD_TOKEN });

        res.status(200).json({
            ok: true,
            usuarioDB,
            token
        });
    });
});

module.exports = app;