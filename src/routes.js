import express from 'express';

import cluster from 'cluster';
import { cpus } from 'os';
import multer from './middlewares/multer';
import cloudinary from './middlewares/cloudinary';

import UsuarioController from './controllers/UsuarioController';
import ImagemController from './controllers/ImagemController';
import VerificacaoEmail from './controllers/VerificacaoEmailController';
import PostagemController from './controllers/PostagemController';
import AmizadeController from './controllers/AmizadeController';

const routes = express.Router();

// Tester
routes.get('/', (req, res) => {
  const CpuInfo = cpus();
  res.json({
    response: 'success',
    portNumber: process.env.PORT || 3000,
    version: '0.5.3',
    cpu: {
      model: CpuInfo[0].model,
      speed: CpuInfo[0].speed,
      cores: CpuInfo.length,
    },
    cluster,
  });
});

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

      return 0; // verificar se este return não afetará
    });
  } else {
    console.log('Não foi possivel concluir o upload!!!');
    // Se o objeto req.file for undefined, ou seja, não houve sucesso, vamos imprimir um erro!
    return res.json({ error: 'Houve erro no upload!' });
  }
  return 0; // verificar se este return não afetará
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
