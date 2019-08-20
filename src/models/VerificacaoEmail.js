const { Schema, model } = require('mongoose');

const VerificarEmailSchema = new Schema({
    fkeusuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    strcodigoativacao: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model('VerificarEmail', VerificarEmailSchema);