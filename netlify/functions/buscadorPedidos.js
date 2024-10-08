const mysql = require('mysql2/promise');
require('dotenv').config();

exports.handler = async (event, context) => {
    try {
        // Estabelecendo a conexão com o banco de dados
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        // Executando a consulta SQL para buscar os pedidos
        const [rows] = await connection.execute('SELECT * FROM pedidos ORDER BY dataEntrada DESC');
        
        // Fechando a conexão com o banco de dados de forma segura
        await connection.end();

        // Retornando os pedidos em formato JSON
        return {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);

        // Caso ocorra algum erro, retornamos uma resposta de erro
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao buscar pedidos' }),
        };
    }
};
