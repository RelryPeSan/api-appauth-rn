const express = require('express');
const UsuarioController = require('./controller/UsuarioController');

const routes = express.Router();


routes.get('/', (req, res) => {
    return res.json({response: 'success'});
});

// Usuario
routes.get('/usuario/:usuarioId', UsuarioController.getById);
routes.get('/usuario', UsuarioController.find);
routes.get('/login/:login/:senha', UsuarioController.login);
routes.post('/usuario', UsuarioController.create);

module.exports = routes;