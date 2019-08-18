const mongoose = require('mongoose');

module.exports = {
    connection() {
        mongoose.connect('mongodb+srv://reratos:6ZShBlYoF5Nuzegv@clusterreactnative-1d2gr.mongodb.net/appauth?retryWrites=true&w=majority', {
            useNewUrlParser: true
        }, (err) => {
            if(err){
                console.error('Erro na comunicação com o banco MongoDB\n', err);
            } else {
                console.info('Conexão estabelecida com o MongoDB');
            }
        });
    }
}

