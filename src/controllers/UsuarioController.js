const Usuario = require('../models/Usuario');

// index, show, store, update, destroy
/*
    index:      GET
    show:       GET
    store:      POST
    update:     PUT
    destroy:    DELETE
 */
module.exports = {
    async getById(req, res) {
        const { usuarioId } = req.params;
        var response = null;

        try {
            response = await Usuario.findById(usuarioId);
        } catch (error) {
            return res.status(400).json({response, error});
        }

        return res.json({response, error: null});
    },

    async find(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const { strnome, strlogin, strsenha, stremail } = req.body;
        var response = null;

        try {
            response = await Usuario.paginate({
                strnome: {$regex: new RegExp(strnome)},
                strlogin: {$regex: new RegExp(strlogin)},
                strsenha: {$regex: new RegExp(strsenha)},
                stremail: {$regex: new RegExp(stremail)},
            }, {
                page: parseInt(page),
                limit: parseInt(limit),
            });
        } catch (error) {
            return res.status(400).json({response, error});
        }

        return res.json({response, error: null});
    },

    async login(req, res) {
        const { user, pass } = req.query;
        var response = null;
        
        try {
            response = await Usuario.findOne({
                strlogin: user,
                strsenha: pass,
            });
        } catch (error) {
            return res.status(400).json({response, error});
        }
        
        return res.json({response, error: null});
    },

    async create(req, res) {
        const { strnome, strlogin, strsenha, stremail } = req.body;
        var response = null;

        try {
            // verifica se já não existe um login ou email cadastrado
            const existAccount = await Usuario.find({
                $or: [
                    {stremail},
                    {strlogin}
                ]
            });
            if(existAccount.length > 0){
                return res.json({response, error: {message: 'Usuário já existente', existAccount} });
            }

            response = await Usuario.create({
                strnome,
                strlogin,
                strsenha,
                stremail,
                blnativo: true,
            })
        } catch (error) {
            return res.status(400).json({response, error});
        }

        return res.json({response, error: null});
    },

    update(req, res) {
        res.json({error: 'Não implementado ainda.'});
    },

    destroy(req, res) {
        res.json({error: 'Não implementado ainda.'});
    }
}