const schemaLogin = require('../Schemas/schemaLogin');

const validarLogin = () => {
    return async (req, res, next) => {
        try {
            await schemaLogin.validateAsync(req.body);
            next();
        } catch (error) {
            return res.status(400).json({ mensagem: error.details[0].message  });
        }
    };
};

module.exports = validarLogin;
