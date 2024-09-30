const mysql = require('mysql2/promise');
require('dotenv').config();

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { item, quantidade, parceiro } = JSON.parse(event.body);

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute(
            'INSERT INTO pedidos (item, quantidade, parceiro, status, dataEntrada) VALUES (?, ?, ?, ?, NOW())', 
            [item, quantidade, parceiro, 'Não Liberado']
        );

        connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Pedido salvo com sucesso', pedidoId: rows.insertId }),
        };
    } catch (error) {
        console.error('Erro ao salvar pedido:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao salvar pedido' }),
        };
    }
};
