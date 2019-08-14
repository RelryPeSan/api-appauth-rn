const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const port = 8080;

const server = express();

mongoose.connect('mongodb+srv://reratos:6ZShBlYoF5Nuzegv@clusterreactnative-1d2gr.mongodb.net/appauth?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(express.json());
server.use(routes);

server.listen(port);
console.log(`Server rodando na porta ${port}`);