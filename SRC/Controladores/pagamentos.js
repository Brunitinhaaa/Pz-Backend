const pool = require('../Database/conexao');

const fazerPagamento = async (req, res) => {
    const { login, forma_pagamento } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM usuarios WHERE login = $1', [login]);
        if (userResult.rows.length === 0) {
            return res.status(401).json({ mensagem: 'Usuário não autenticado' });
        }

        const carrinhoResult = await pool.query(`
            SELECT c.*, m.nome_item
            FROM carrinho c
            JOIN menu m ON c.menu_id = m.id
            WHERE c.usuario_id = (SELECT id FROM usuarios WHERE login = $1)
        `, [login]);

        if (carrinhoResult.rows.length === 0) {
            return res.status(400).json({ mensagem: 'Não há itens no carrinho' });
        }

        if (!forma_pagamento) {
            return res.status(400).json({ mensagem: 'A forma de pagamento deve ser especificada' });
        }

        for (const item of carrinhoResult.rows) {
            await pool.query(`
                INSERT INTO pedidos (usuario_id, menu_id, nome_item, quantidade, forma_pagamento, preco)
                VALUES ((SELECT id FROM usuarios WHERE login = $1), $2, $3, $4, $5, $6)
            `, [login, item.menu_id, item.nome_item, item.quantidade, forma_pagamento, item.preco]);
        }

        await pool.query('DELETE FROM carrinho WHERE usuario_id = (SELECT id FROM usuarios WHERE login = $1)', [login]);

        return res.status(200).json({ mensagem: 'Pedido efetuado com sucesso', tempo_entrega: '30 min' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Pedido não foi bem sucedido, favor tentar novamente mais tarde' });
    }
};


module.exports = {
    fazerPagamento
};
