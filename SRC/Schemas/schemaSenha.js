const Joi = require('joi');

const schemaSenha = Joi.object({
login: Joi.string(),
    senha_login: Joi.string()
        .min(8)
        .pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])'))
        .required()
        .messages({
            'string.min': 'A senha deve ter pelo menos 8 caracteres.',
            'string.pattern.base': 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um caractere especial.'
        })
});

module.exports = schemaSenha;
