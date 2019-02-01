// imports
const express = require('express');
const _ = require('underscore');
const Conductor = require('../../models/conductor');

// configuracion express
const app = express();

// obtener todos los conductores
app.get('/conductores', (req, res) => {
    Conductor.find({ estado: true })
        .exec((err, conductores) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Conductor.count({ estado: true }, (err, total) => {
                res.status(200).json({
                    ok: true,
                    conductores,
                    total
                });
            });
        });
});

// crear un conductor
app.post('/conductor', (req, res) => {
    let body = req.body;

    let conductor = new Conductor({
        nombre: body.nombre,
        rut: body.rut
    });

    conductor.save((err, conductorDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            conductor: conductorDB
        });
    });
});

// actualizar un conductor
app.put('/conductor/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'rut']);

    Conductor.findByIdAndUpdate(id, body, { new: true }, (err, conductorDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            conductor: conductorDB
        });
    });
});

// eliminar un conductor
app.delete('/conductor/:id', (req, res) => {

    let id = req.params.id;
    let cambiarEstado = {
        estado: false
    }

    Conductor.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, conductorDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            conductor: conductorDB
        });
    });
});

module.exports = app;