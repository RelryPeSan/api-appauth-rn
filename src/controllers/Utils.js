const VerificarEmail = require('../models/VerificacaoEmail');
const nodemailer = require('../middlewares/nodemailer');

module.exports = {
  gerarCodigoVerificacaoEmail(userId, stremail, callback) {
    const doc = {
      fkeusuario: userId,
      strcodigoativacao: `000000${Math.random() * 100000}`.slice(-6),
    };

    VerificarEmail.findOne({ fkeusuario: userId }, (err, res) => {
      if (err) {
        callback(err, res);
      }

      if (res) {
        VerificarEmail.update(res, doc);
      } else {
        res = VerificarEmail.create(doc);
      }

      nodemailer.sendMail(
        stremail,
        'Código para confirmação de conta',
        `<p>CÓDIGO: <strong>${doc.strcodigoativacao}</strong></p>
                <p>Informe este código no seu APP Auth para finalizar seu cadastro</p>`
      );

      callback(null, doc);
    });
  },

  validarCodigoVerificacaoEmail(userId, codigoInformado, callback) {
    VerificarEmail.findOne({ fkeusuario: userId }, (err, res) => {
      // retorna o erro e o documento, caso a consulta tenha gerado erro
      if (err) {
        callback(err, res);
      }

      if (res) {
        // verifica se o codigo enviado foi o mesmo informado
        if (res.strcodigoativacao === codigoInformado) {
          console.log(`Usuário ativado: ${userId}`);

          // deleta o codigo do banco de verificação pendentes
          VerificarEmail.deleteOne(res, err => {
            if (err) callback(err, res);
            else callback(null, res);
          });
        } else {
          // caso código não coincidir o response será false
          callback(null, false);
        }
      } else {
        callback(null, null);
      }
    });
  },
};
