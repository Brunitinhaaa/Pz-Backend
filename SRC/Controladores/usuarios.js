const pool = require('../Database/conexao');
const bcrypt = require('bcrypt');
const schemaSenha = require('../schemas/schemaSenha');

const jwt = require('jsonwebtoken')

const LogarUsuario = async (req, res) => {
    const { login, senha_login, telefone } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM usuarios WHERE login = $1 OR telefone = $2', [login, telefone]);
        const user = userResult.rows[0];
        if (!user) {
            return res.status(401).json({ mensagem: 'O usuário ou número de telefone não existem' });
        }

        const isValidPassword = await bcrypt.compare(senha_login, user.senha_login);
        if (!isValidPassword) {
            return res.status(401).json({ mensagem: 'A senha está incorreta' });
        }

        const token = jwt.sign({id: user.id},  process.env.PASSHASH, {expiresIn: '8h'})
        return res.status(200).json({ 
            user,
            token
        });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const CadastrarUsuario = async (req, res) => {
    const { senha_login, login, endereco, cep, telefone, nome_completo } = req.body;

    try {
        await schemaSenha.validateAsync({ senha_login });

        const senhaCriptografada = await bcrypt.hash(senha_login, 10);

        const userResult = await pool.query('SELECT * FROM usuarios WHERE login = $1 OR telefone = $2', [login, telefone]);
        if (userResult.rows.length > 0) {
            return res.status(409).json({ mensagem: 'Usuário já existe' });
        }

        await pool.query('INSERT INTO usuarios (login, senha_login, endereco, cep, telefone, nome_completo) VALUES ($1, $2, $3, $4, $5, $6)', [login, senhaCriptografada, endereco, cep, telefone, nome_completo]);

        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const AtualizarUsuario = async (req, res) => {
    const { login, endereco, cep, telefone, nome_completo } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM usuarios WHERE login = $1', [login]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        await pool.query('UPDATE usuarios SET endereco = $1, cep = $2, telefone = $3, nome_completo = $4 WHERE login = $5', [ endereco, cep, telefone, nome_completo, login]);

        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const AtualizarSenha = async (req, res) => {
    const { login, senha_login, telefone } = req.body;

    try {

        if(!login && !telefone) {
            return res.status(401).json({ mensagem: "O campo email ou telefone é obrigatório" });
        }

        const userResult = await pool.query('SELECT * FROM usuarios WHERE login = $1', [login]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }

        const senhaCriptografada = await bcrypt.hash(senha_login, 10);

        await pool.query('UPDATE usuarios SET senha_login = $1 WHERE login = $2', [senhaCriptografada, login]);

        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    LogarUsuario,
    CadastrarUsuario,
    AtualizarUsuario,
    AtualizarSenha
};
