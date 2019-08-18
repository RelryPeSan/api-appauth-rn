const express = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const ImagemController = require('./controllers/ImagemController');
const multer = require('./middlewares/multer');
const cloudinary = require('./middlewares/cloudinary');
const cluster = require('cluster');
const CPUs = require('os').cpus();

const routes = express.Router();


routes.get('/', (req, res) => {
    return res.json({
        response: 'success',
        portNumber: (process.env.PORT || 3000),
        version: '0.5.1',
        cpu: {
            model: CPUs[0].model,
            speed: CPUs[0].speed,
            cores: CPUs.length,
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
            if(err){
                return res.send(err);
            } else {
                // configura o body para conter o link da imagem
                req.body = {
                    strfotoperfil: image.secure_url,
                }
                
                UsuarioController.update(req, res);
            }
        });
    } else {
        console.log('Não foi possivel concluir o upload!!!');
        // Se o objeto req.file for undefined, ou seja, não houve sucesso, vamos imprimir um erro!
        return res.json({error: 'Houve erro no upload!'});
    }
});

// Login - Autenticação
routes.get('/login', UsuarioController.login);


module.exports = routes;