const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    strnome: {
        type: String,
        required: true,
    },
    strlogin: {
        type: String,
        required: true,
    },
    strsenha: {
        type: String,
        required: true,
    },
    stremail: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = model('Usuario', UsuarioSchema);