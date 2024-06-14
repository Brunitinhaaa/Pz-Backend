const pool = require('../Database/conexao');

const adicionarCarrinho = async (req, res) => {
    const { menu_id, quantidade } = req.body;
    const usuario_id = req.usuario.id; 

    try {

        const precoResult = await pool.query('SELECT preco FROM menu WHERE id = $1', [menu_id]);
        const preco = precoResult.rows[0].preco;


        await pool.query(
            'INSERT INTO carrinho (usuario_id, menu_id, quantidade, preco) VALUES ($1, $2, $3, $4)',
            [usuario_id, menu_id, quantidade, preco * quantidade]
        );
        return res.status(201).json({ mensagem: 'Item adicionado ao carrinho com sucesso' });
        
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const listarCarrinho = async (req, res) => {
    const usuario_id = req.usuario.id; 

    try {
        const result = await pool.query(
            `SELECT c.usuario_id, ARRAY_AGG(json_build_object('nome_item', m.nome_item, 'quantidade', c.quantidade, 'preco', c.preco)) AS itens, SUM(c.preco * c.quantidade) AS total
            FROM carrinho c
            JOIN menu m ON c.menu_id = m.id
            WHERE c.usuario_id = $1
            GROUP BY c.usuario_id`,
            [usuario_id]
        );

        if (result.rows.length === 0) {
            return res.status(200).json({ mensagem: 'Carrinho vazio' });
        }

        const carrinhoFormatado = result.rows.map(row => ({
            usuario_id: row.usuario_id,
            itens: row.itens,
            total: row.total.toString()
        }));

        return res.status(200).json(carrinhoFormatado);

    } catch (error) {
        console.error('Erro ao listar carrinho:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

const removerCarrinho = async (req, res) => {
    const usuario_id = req.usuario.id; 

    try {
        await pool.query('DELETE FROM carrinho WHERE usuario_id = $1', [usuario_id]);
        return res.status(200).json({ mensagem: 'Itens removidos do carrinho com sucesso' });

    } catch (error) {
        console.error('Erro ao remover itens do carrinho:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    adicionarCarrinho,
    listarCarrinho,
    removerCarrinho
};
