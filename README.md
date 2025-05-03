# Pz-Backend


# 🧠 Pz-Backend

API simples desenvolvida com Node.js e Express para gerenciamento de Pizzaria.

## 🚀 Tecnologias

- Node.js
- Express
- MySQL
- Sequelize
- Dotenv

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Brunitinhaaa/Pz-Backend.git
cd Pz-Backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
- Crie um arquivo `.env` com suas credenciais:
```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```
- Importe o arquivo `dump.sql` para criar as tabelas:
```bash
mysql -u seu_usuario -p seu_banco < dump.sql
```

4. Inicie a aplicação:
```bash
npm start
```


