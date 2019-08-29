import Usuario from '../models/Usuario';

module.exports = {
  listarAmizades(req, res) {
    const { userId } = req.params;

    Usuario.findById(userId, (err, doc) => {
      if (err) return res.json(err);

      if (doc) {
        const amigos = doc.arramigos;
        return res.json({ amigos });
      }
      return res.json({ error: 'Sem resposta', doc });
    });
    // res.json({error: 'Não implementado ainda.'});
  },

  enviarSolicitacaoAmizade(req, res) {
    const { userid } = req.query;
    const { amigoid } = req.body;

    Usuario.findById(userid, (err1, doc) => {
      if (err1) return res.json(err1);

      if (doc) {
        doc.arramigos.push(amigoid);

        doc.save(null, (err2, ret) => {
          if (err2) return res.json({ err2 });

          if (ret) return res.json(ret);
          return res.json({
            err2,
            ret,
            mensagem:
              'Sem retorno ao tentar salvar em enviarSolicitacaoAmizade',
          });
        });
      } else {
        return res.json({ err1, doc });
      }
    });
    // res.json({error: 'Não implementado ainda.'});
  },

  desfazerAmizade(req, res) {
    res.json({ error: 'Não implementado ainda.' });
  },
};
