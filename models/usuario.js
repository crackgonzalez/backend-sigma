// imports
const mongoose = require('mongoose');

// roles para el usuario
let rolesValidos = {
    values: ['CONDUCTOR', 'COT', 'SUPERVISOR', 'JEFE_LINEA', 'ADMINISTRADOR'],
    message: '{VALUE} no es un rol válido'
};

// creacion del schema
let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
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
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    rol: {
        type: String,
        enum: rolesValidos
    }
}, { collection: 'usuarios' });

// quitar la informacion de la contraseña del usuario
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

// exportamos el modelo del usuario
module.exports = mongoose.model('Usuario', usuarioSchema);