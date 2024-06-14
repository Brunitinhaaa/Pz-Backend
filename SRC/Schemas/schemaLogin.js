const Joi = require('joi');

const schemaLogin = Joi.object({
    login: Joi.string().email().required().messages({
        'any.required': 'O campo email ou telefone é obrigatório.'
    }),
    senha_login: Joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório.'
    })
});

module.exports = schemaLogin;
