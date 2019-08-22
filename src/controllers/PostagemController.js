const Usuario = require('../models/Usuario');
const mongoose = require('mongoose');

function getIndexById(array, id){
    var objID = mongoose.Types.ObjectId(id);

    for(i = 0; array[i] !== undefined; i++){
        if(objID.equals(array[i]._id)){
            return i;
        }
    }

    return null;
}

module.exports = {
    getById(req, res) {
        res.json({error: 'Não implementado ainda.'});
    },

    listarPostagensDeAmizadesOrdenadaPorDataDecrescente(req, res) {
        const { userid } = req.query;

        console.log(userid);
        Usuario.findById(userid, (err, doc) => {
            if (err) return res.json({err});

            if(doc){
                const amigos = new Array(doc.arramigos);
                const posts = new Array();
                console.log('Amigos: ' + amigos.toString());
                
                amigos.map(function(id, index, arr){
                    Usuario.findById(id, (err, doc) => {
                        if(err) return;

                        if(doc)
                            posts.push(doc.arrpostagens);

                        return;
                    });
                });

                console.log('Timeline: ' + posts);
                return res.json({posts});
            } else {
                return res.json({err, doc});
            }
        })
        //res.json({error: 'Não implementado ainda.'});
    },

    criarPostagem(req, res) {
        const { userid } = req.query;
        const { texto } = req.body;

        Usuario.findById(userid, (err, doc) => {
            if(err){
                return res.json(err);
            } else {

                // realiza unshift para adicionar a nova postagem no inicio do aray do doumento
                doc.arrpostagens.unshift({strmensagem: texto});
                doc.save((err, ret) => {
                    if(err){
                        return res.json(err);
                    } else {
                        return res.json(ret);
                    }
                });
            }
        });
    },
    
    editarPostagem(req, res) {
        const { userid, postagemid } = req.query;
        const { texto } = req.body;

        Usuario.findById(userid, (err, doc) => {
            if(err){
                return res.json(err);
            } else {
                
                // busca no banco o index do array da postagem do usuario
                const retIndex = getIndexById(doc.arrpostagens, postagemid);

                // se retornar um index, será possivel modifica-lo
                if(retIndex !== null){

                    // passamos o valor do _id e createAt novamente para que não seja gerado um novo
                    doc.arrpostagens.set(retIndex, {
                        _id: doc.arrpostagens[retIndex]._id,
                        strmensagem: texto,
                        createdAt: doc.arrpostagens[retIndex].createdAt,
                    });

                    // salva a alteração no banco
                    doc.save((err, ret) => {
                        if(err){
                            return res.json(err);
                        } else {
                            return res.json(ret);
                        }
                    });
                } else {
                    return res.json({error: 'Não foi possivel identificar o index desta postagem.', postagemid});
                }
            }
        });

        return res.json({error: 'Sem resposta'});
    },

    removerPostagem(req, res) {
        const { userid, postagemid } = req.query;

        Usuario.findById(userid, (err, doc) => {
            if(err){
                return res.json(err);
            } else {
                doc.arrpostagens.remove(postagemid);
                
                doc.save((err, ret) => {
                    if(err){
                        return res.json(err);
                    } else {
                        return res.json(ret);
                    }
                });
            }
        });
    }
}