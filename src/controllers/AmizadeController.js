const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');

module.exports = {
    listarAmizades(req, res) {
        const { userId } = req.params;
        
        Usuario.findById(userId, (err, doc) => {
            if(err) return res.json(err);

            if(doc){
                const amigos = doc.arramigos;
                return res.json({amigos});
            }
        });
        //res.json({error: 'Não implementado ainda.'});
    },

    enviarSolicitacaoAmizade(req, res) {
        const { userid } = req.query;
        const { amigoid } = req.body;

        Usuario.findById(userid, (err, doc) => {
            if(err) return res.json(err);

            if(doc){
                doc.arramigos.push(amigoid);

                doc.save(null, (err, ret) => {
                    if(err) return res.json(err);

                    if(ret) return res.json(ret);
                    else return res.json({err, ret, mensagem: 'Sem retorno ao tentar salvar em enviarSolicitacaoAmizade'});
                });
            } else {
                return res.json({err, doc});
            }
        });
        //res.json({error: 'Não implementado ainda.'});
    },

    desfazerAmizade(req, res) {
        res.json({error: 'Não implementado ainda.'});
    }
}