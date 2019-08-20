const VerificacaoEmail = require('../models/VerificacaoEmail');
const Utils = require('./Utils');
const UsuarioController = require('./UsuarioController');

module.exports = {
    criarCodigo(req, res){

    },

    verificarCodigo(req, res){
        const { userid = null, strcodigoativacao = null } = req.body;

        if( !userid || !strcodigoativacao ) {
            return res.json({
                error: 'Campo(s) não informado(s)',
                userid,
                strcodigoativacao
            });
        }

        Utils.validarCodigoVerificacaoEmail(userid, strcodigoativacao, (err, ret) => {
            if(err) {
                return res.json({error: err});
            } else {
                if(ret) {
                    const send = {
                        body: {
                            blnemailconfirmado: true
                        },
                        query: {
                            userid
                        }
                    };
                    UsuarioController.update(send, res);
                } else {
                    return res.json(ret);
                }
            }
        });
    }
}