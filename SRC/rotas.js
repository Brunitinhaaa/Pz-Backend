const express = require('express');
const login = require('./controladores/usuarios');
const pedidos = require('./controladores/pedidos'); 
const pagamentos = require('./controladores/pagamentos');

const validarLogin = require('./Middleware/validarLogin');
const validarCadastro = require('./Middleware/validarCadastro');
const validarSenha = require('./Middleware/validarSenha');

const autenticacao = require('./Middleware/autenticacao');

const rotas = express();

rotas.post('/login', validarLogin(), login.LogarUsuario);
rotas.post('/cadastro', validarCadastro(), login.CadastrarUsuario);

rotas.use(autenticacao); 

rotas.put('/atualizar', validarCadastro(), login.AtualizarUsuario); 
rotas.put('/atualizarSenha', validarSenha(), login.AtualizarSenha);

rotas.post('/pedidos', pedidos.adicionarCarrinho);
rotas.delete('/pedidos', pedidos.removerCarrinho);

rotas.get('/pedidos', pedidos.listarCarrinho);

rotas.post('/pagamentos', pagamentos.fazerPagamento);

module.exports = rotas;
