const Imagem = require('../models/Imagem');
const multer = require('../middlewares/multer');

module.exports = {
  getById(req, res) {
    res.json({ error: 'Não implementado ainda.' });
  },

  upload(req, res, next) {
    if (req.image) {
      multer.single(req.image);
    }

    res.json(req.file);
  },

  create(req, res, next) {
    console.log(req);
    res.json({ error: 'Não implementado ainda.' });
  },
};
