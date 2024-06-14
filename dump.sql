CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) UNIQUE NOT NULL,
    senha_login VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    cep VARCHAR(255) NOT NULL,
    nome_completo VARCHAR(255) NOT NULL
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    quantidade INTEGER NOT NULL,
    nome_item VARCHAR(255) NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    forma_pagamento VARCHAR(255) NOT NULL
);

CREATE TABLE menu (
    id SERIAL PRIMARY KEY,
    nome_item VARCHAR(255) UNIQUE NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    ingredientes TEXT
);

CREATE TABLE carrinho (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    menu_id INTEGER NOT NULL REFERENCES menu(id),
    quantidade INTEGER NOT NULL,
    preco NUMERIC(10,2) NOT NULL
);

INSERT INTO usuarios (login, senha_login, telefone, endereco, cep, nome_completo) VALUES
    ('usuario1@example.com', 'senha123', '123456789', 'Rua A, 123', '12345-678', 'Usuário 1'),
    ('usuario2@example.com', 'abc123', '987654321', 'Rua B, 456', '98765-432', 'Usuário 2'),
    ('usuario3@example.com', 'senha456', '111111111', 'Rua C, 789', '54321-098', 'Usuário 3');

INSERT INTO menu (nome_item, preco, ingredientes) VALUES
    ('Margherita', 25.99, 'Molho de tomate, mussarela, manjericão'),
    ('Pepperoni', 27.99, 'Molho de tomate, mussarela, pepperoni'),
    ('Calabresa', 24.99, 'Molho de tomate, mussarela, calabresa, cebola'),
    ('Quatro Queijos', 29.99, 'Molho de tomate, mussarela, parmesão, gorgonzola, catupiry'),
    ('Frango com Catupiry', 28.99, 'Molho de tomate, mussarela, frango desfiado, catupiry'),
    ('Portuguesa', 26.99, 'Molho de tomate, mussarela, presunto, ovo, cebola, azeitona, ervilha, tomate');

INSERT INTO pedidos (usuario_id, quantidade, nome_item, preco, forma_pagamento) VALUES
    (1, 1, 'Margherita', 25.99, 'Cartão de Crédito'),
    (2, 2, 'Quatro Queijos', 59.98, 'Dinheiro'),
    (3, 1, 'Frango com Catupiry', 28.99, 'Cartão de Débito'),
    (1, 3, 'Calabresa', 74.97, 'Dinheiro');

ALTER TABLE pedidos
ADD COLUMN menu_id INTEGER REFERENCES menu(id);
