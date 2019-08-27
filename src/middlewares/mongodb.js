import mongoose from 'mongoose';
import databaseMongoDB from '../../config/databaseMongoDB';

module.exports = {
  connection() {
    mongoose.connect(
      databaseMongoDB.URLConnection,
      {
        useNewUrlParser: true,
      },
      err => {
        if (err) {
          console.error('Erro na comunicação com o banco MongoDB\n', err);
        } else {
          console.info('Conexão estabelecida com o MongoDB');
        }
      }
    );
  },
};
