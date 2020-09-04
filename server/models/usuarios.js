const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// Definir esquema del modelo
let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    }
});
// Exportar modelo
module.exports = mongoose.model('Usuario', usuarioSchema);

