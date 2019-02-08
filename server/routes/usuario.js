// imports
const express = require('express');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const Usuario = require('../../models/usuario');
const { verificarToken } = require('../middlewares/auth');

// configuracion express
const app = express();

// obtener todos los usuarios
app.get('/usuarios', [verificarToken], (req, res) => {
    Usuario.find({ estado: true })
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({ estado: true }, (err, total) => {
                res.status(200).json({
                    ok: true,
                    usuarios,
                    total
                });
            });
        });
});

// crear un usuario
app.post('/usuario', verificarToken, (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        rut: body.rut,
        password: bcrypt.hashSync(body.password, 10),
        email: body.email,
        rol: body.rol
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        usuarioDB.password = ';)';

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

// actualizar un usuario
app.put('/usuario/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'rut', 'password', 'email', 'rol']);

    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        usuarioDB.password = ';)';

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

// eliminar un usuario
app.delete('/usuario/:id', verificarToken, (req, res) => {

    let id = req.params.id;
    let cambiarEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        usuarioDB.password = ';)';

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

module.exports = app;