const Usuario = require('../model/Usuario');

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
        const { strnome, strlogin, strsenha, stremail } = req.body;
        var response = null;

        try {
            response = await Usuario.find({
                strnome: {$regex: new RegExp(strnome)},
                strlogin: {$regex: new RegExp(strlogin)},
                strsenha: {$regex: new RegExp(strsenha)},
                stremail: {$regex: new RegExp(stremail)},
            });
        } catch (error) {
            return res.status(400).json({response, error});
        }

        return res.json({response, error: null});
    },

    async login(req, res) {
        const { login, senha } = req.params;
        var response = null;
        
        try {
            response = await Usuario.findOne({
                strlogin: login,
                strsenha: senha,
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
            response = await Usuario.create({
                strnome,
                strlogin,
                strsenha,
                stremail,
            })
        } catch (error) {
            return res.status(400).json({response, error});
        }

        return res.json({response, error: null});
    }
}