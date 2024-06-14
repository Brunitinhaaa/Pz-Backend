const Joi = require('joi');

const schemaCadastroCompleto = Joi.object({
    login: Joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório.'
    }),
    senha_login: Joi.string()
    ,
    telefone: Joi.string().required().messages({
        'any.required': 'O campo telefone é obrigatório.'
    }),
    endereco: Joi.string().required().messages({
        'any.required': 'O campo endereço é obrigatório.'
    }),
    cep: Joi.string().required().messages({
        'any.required': 'O campo CEP é obrigatório.'
    }),
    nome_completo: Joi.string().required().messages({
        'any.required': 'O campo nome completo é obrigatório.'
    })
});

module.exports = schemaCadastroCompleto;


