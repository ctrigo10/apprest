const mongoose = require('mongoose');
// Declarar variable unique-validator
const uniqueValidator = require('mongoose-unique-validator');

// Validadion de rol
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

mongoose.set('useCreateIndex', true);

// Definir esquema del modelo
let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    }
});

// Modificar esquema para omitir enviar la contrasenia cifrada
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

// Indicar uso de modulo de validacion
usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe es unico'});
// Exportar modelo
module.exports = mongoose.model('Usuario', usuarioSchema);

