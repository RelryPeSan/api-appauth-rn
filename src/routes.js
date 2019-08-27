const express = require('express');

const cluster = require('cluster');
const CPUs = require('os').cpus();
const multer = require('./middlewares/multer');
const cloudinary = require('./middlewares/cloudinary');

const UsuarioController = require('./controllers/UsuarioController');
const ImagemController = require('./controllers/ImagemController');
const VerificacaoEmail = require('./controllers/VerificacaoEmailController');
const PostagemController = require('./controllers/PostagemController');
const AmizadeController = require('./controllers/AmizadeController');

const routes = express.Router();

// Tester
routes.get('/', (req, res) =>
  res.json({
    response: 'success',
    portNumber: process.env.PORT || 3000,
    version: '0.5.3',
    cpu: {
      model: CPUs[0].model,
      speed: CPUs[0].speed,
      cores: CPUs.length,
    },
    cluster,
  })
);

// Usuario
routes.get('/usuario/:usuarioId', UsuarioController.getById);
routes.get('/usuario', UsuarioController.find);
routes.post('/usuario', UsuarioController.create);
routes.put('/usuario', UsuarioController.update);
routes.delete('/usuario', UsuarioController.destroy);

// Imagem do usuario
routes.get('/usuario/imagem/:usuarioId', ImagemController.getById);
routes.post('/usuario/imagem', multer.single('image'), (req, res) => {
  // Se houve sucesso no armazenamento/buffer
  if (req.file) {
    // Vamos enviar o arquivo para o cloudinary
    cloudinary.upload(req, res, (err, image) => {
      if (err) {
        return res.send(err);
      }
      // configura o body para conter o link da imagem
      req.body = {
        strfotoperfil: image.secure_url,
      };

      UsuarioController.update(req, res);
    });
  } else {
    console.log('Não foi possivel concluir o upload!!!');
    // Se o objeto req.file for undefined, ou seja, não houve sucesso, vamos imprimir um erro!
    return res.json({ error: 'Houve erro no upload!' });
  }
});

// Login - Autenticação
routes.get('/login', UsuarioController.login);

// Email
routes.put('/validaremail', VerificacaoEmail.verificarCodigo);

// Amizade
routes.get('/amizade/:userId', AmizadeController.listarAmizades);
routes.post('/amizade', AmizadeController.enviarSolicitacaoAmizade);
routes.delete('/amizade', AmizadeController.desfazerAmizade);

// Postagem
routes.get('/postagem/:userId', PostagemController.getById);
routes.get(
  '/postagem',
  PostagemController.listarPostagensDeAmizadesOrdenadaPorDataDecrescente
);
routes.post('/postagem', PostagemController.criarPostagem);
routes.put('/postagem', PostagemController.editarPostagem);
routes.delete('/postagem', PostagemController.removerPostagem);

module.exports = routes;
