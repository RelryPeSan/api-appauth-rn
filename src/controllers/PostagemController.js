import mongoose from 'mongoose';
import Usuario from '../models/Usuario';

function getIndexById(array, id) {
  const objID = mongoose.Types.ObjectId(id);

  for (let i = 0; array[i] !== undefined; i++) {
    if (objID.equals(array[i]._id)) {
      return i;
    }
  }

  return null;
}

module.exports = {
  getById(req, res) {
    res.json({ error: 'Não implementado ainda.' });
  },

  async listarPostagensDeAmizadesOrdenadaPorDataDecrescente(req, res) {
    const { userid } = req.query;

    await Usuario.findById(userid, async (err, doc) => {
      if (err) return res.json({ err });

      if (doc) {
        const amigos = [];

        // cria uma array de ID do MongoDB das pessoas que o usuario segue
        for (let x = 0; doc.arramigos[x] !== undefined; x++) {
          amigos.push(mongoose.Types.ObjectId(doc.arramigos[x]._id));
        }

        // busca o array de ID's, devolve um array de documentos(pessoas)
        await Usuario.find(
          {
            _id: { $in: amigos },
          },
          async (error, docs) => {
            if (error) return;

            const posts = [];

            for (let x = 0; docs[x] !== undefined; x++) {
              const amigo = docs[x];

              for (let i = 0; amigo.arrpostagens[i] !== undefined; i++) {
                posts.push({
                  userid: amigo._id,
                  userfoto: amigo.strfotoperfil,
                  usernome: amigo.strnome,
                  postid: amigo.arrpostagens[i]._id,
                  posttexto: amigo.arrpostagens[i].strmensagem,
                  postdata: amigo.arrpostagens[i].createdAt,
                });
              }
            }

            // ordena a postagens por data de criação
            posts.sort((a, b) => {
              if (a.postdata < b.postdata) {
                return 1;
              }
              if (a.postdata > b.postdata) {
                return -1;
              }
              return 0;
            });

            return res.json({ posts });
          }
        );

        // return res.json({ posts });
      }

      // return res.json({ err, doc });
    });
    // res.json({error: 'Não implementado ainda.'});
  },

  criarPostagem(req, res) {
    const { userid } = req.query;
    const { texto } = req.body;

    try {
      Usuario.findById(userid, (err, doc) => {
        if (err) {
          return res.json(err);
        }

        if (doc) {
          // realiza unshift para adicionar a nova postagem no inicio do aray do doumento
          doc.arrpostagens.unshift({ strmensagem: texto });
          doc.save((err, ret) => {
            if (err) {
              return res.json(err);
            }
            return res.status(201).json(ret);
          });
        } else {
          return res.json({
            doc,
            mensagem: 'Não teve retorno com o id informado',
            userid,
          });
        }
      });
    } catch (error) {
      return res.json(error);
    }
  },

  editarPostagem(req, res) {
    const { userid, postagemid } = req.query;
    const { texto } = req.body;

    try {
      Usuario.findById(userid, (err, doc) => {
        if (err) {
          return res.json(err);
        }

        if (doc) {
          // busca no banco o index do array da postagem do usuario
          const retIndex = getIndexById(doc.arrpostagens, postagemid);

          // se retornar um index, será possivel modifica-lo
          if (retIndex !== null) {
            // passamos o valor do _id e createAt novamente para que não seja gerado um novo
            doc.arrpostagens.set(retIndex, {
              _id: doc.arrpostagens[retIndex]._id,
              strmensagem: texto,
              createdAt: doc.arrpostagens[retIndex].createdAt,
            });

            // salva a alteração no banco
            doc.save((err, ret) => {
              if (err) {
                return res.json(err);
              }
              return res.json(ret);
            });
          } else {
            return res.json({
              error: 'Não foi possivel identificar o index desta postagem.',
              postagemid,
            });
          }
        } else {
          return res.json({
            doc,
            mensagem: 'Não teve retorno com o id informado',
            userid,
          });
        }
      });
    } catch (error) {
      return res.json({ error: 'Sem resposta' });
    }
  },

  removerPostagem(req, res) {
    const { userid, postagemid } = req.query;

    Usuario.findById(userid, (err, doc) => {
      if (err) {
        return res.json(err);
      }
      doc.arrpostagens.remove(postagemid);

      doc.save((err, ret) => {
        if (err) {
          return res.json(err);
        }
        return res.json(ret);
      });
    });
  },
};
