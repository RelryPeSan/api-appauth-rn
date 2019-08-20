const express = require('express');
const cors = require('cors');
const mongodb = require('./middlewares/mongodb');
const routes = require('./routes');
// const cFiles = require('./helpers/classFiles');

const port = process.env.PORT || 3000;

const app = express();
const server = require('http').Server(app);
const socketio = require('socket.io')(server);

socketio.on('connect', socket => {
    console.log('Nova conexão', socket.id);
})

// configura e estabelece a conexão com o banco de dados
mongodb.connection();

app.use(express.json());
app.use(cors());
app.use(routes);

// cFiles.clearDir('./temp/images');

server.listen(port, () => {
    console.log(`Server rodando na porta: ${port}`);
});