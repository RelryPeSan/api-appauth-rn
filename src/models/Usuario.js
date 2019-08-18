const { Schema, model, plugin } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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
    },
    strcpf: {
        type: String,
    },
    dtmnascimento: {
        type: Date,
    },
    blnativo: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true,
});

UsuarioSchema.plugin(mongoosePaginate);

module.exports = model('Usuario', UsuarioSchema);