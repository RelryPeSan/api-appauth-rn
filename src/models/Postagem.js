import { Schema, model } from 'mongoose';

const PostagemSchema = new Schema(
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

module.exports = model('Postagem', PostagemSchema);
