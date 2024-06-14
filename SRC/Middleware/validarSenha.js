const schemaSenha = require('../Schemas/schemaSenha');

const validarSenha = () => {
    return async (req, res, next) => {
        try {
            await schemaSenha.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({ mensagem: error.details[0].message });
        }
    };
};

module.exports = validarSenha;