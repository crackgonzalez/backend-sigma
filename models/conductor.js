// imports
const mongoose = require('mongoose');

// creacion del schema
let Schema = mongoose.Schema;
let conductorSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    rut: {
        type: String,
        unique: true,
        required: [true, 'El rut es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
}, { collection: 'conductores' });

// exportamos el modelo del conductor
module.exports = mongoose.model('Conductor', conductorSchema);