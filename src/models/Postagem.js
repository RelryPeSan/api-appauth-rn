const { Schema, model } = require('mongoose');

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

module.exports = PostagemSchema;
