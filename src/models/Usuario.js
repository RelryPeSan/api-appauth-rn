import mongoose, { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

// retira o deprecation warning
mongoose.set('useCreateIndex', true);

const Generos = Object.freeze({
  Masculino: 'Masculino',
  Feminino: 'Feminino',
  Outro: 'Outro',
  Nenhum: 'Nenhum',
});

const Postagem = new Schema(
  {
    strmensagem: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Foto = new Schema(
  {
    strlinkfoto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Amigo = new Schema(
  {
    fkeusuario: {
      type: Schema.Types.ObjectId,
      require: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const UsuarioSchema = new Schema(
  {
    strnome: {
      type: String,
      required: true,
    },
    strlogin: {
      type: String,
      required: true,
      unique: true,
    },
    strsenha: {
      type: String,
      required: true,
    },
    stremail: {
      type: String,
      required: true,
      unique: true,
    },
    strcpf: {
      type: String,
      default: null,
    },
    dtmnascimento: {
      type: Date,
      default: null,
    },
    enmsexo: {
      type: String,
      enum: Object.values(Generos),
      default: Generos.Nenhum,
      required: true,
    },
    strfotoperfil: {
      type: String,
      default: null,
    },
    blncontaativada: {
      type: Boolean,
      required: true,
      default: true,
    },
    blnemailconfirmado: {
      type: Boolean,
      required: true,
      default: false,
    },
    arrpostagens: {
      type: [Postagem],
      default: [],
    },
    arrfotos: {
      type: [Foto],
      default: [],
    },
    arramigos: {
      type: [Amigo],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

UsuarioSchema.plugin(mongoosePaginate);

module.exports = model('Usuario', UsuarioSchema);
