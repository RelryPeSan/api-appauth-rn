const express = require('express');
const UsuarioController = require('./controller/UsuarioController');

const routes = express.Router();


routes.get('/', (req, res) => {
    return res.json({response: 'success', portNumber: (process.env.PORT || 3000)});
});

// Usuario
routes.get('/usuario/:usuarioId', UsuarioController.getById);
routes.get('/usuario', UsuarioController.find);
routes.get('/login', UsuarioController.login);
routes.get('/login/:login/:senha', function(req, res) {
    const { login, senha } = req.params;
    console.log('Redirecionamento de rota...');
    res.redirect(`/login?user=${login}&pass=${senha}`);
});
routes.post('/usuario', UsuarioController.create);

module.exports = routes;