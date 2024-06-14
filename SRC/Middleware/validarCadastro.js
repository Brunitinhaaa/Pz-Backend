const schemaCadastroCompleto = require('../Schemas/schemaCadastro');

const validarCadastroCompleto = () => {
    return async (req, res, next) => {
        try {
            await schemaCadastroCompleto.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({ mensagem: error.details[0].message  });
        }
    };
};

module.exports = validarCadastroCompleto;
 