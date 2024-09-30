const mysql = require('mysql2/promise');
require('dotenv').config();

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const { pedidoId, status } = JSON.parse(event.body);

    if (!pedidoId || !status) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'ID do pedido e status são obrigatórios.' }),
        };
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [result] = await connection.execute(
            'UPDATE pedidos SET status = ? WHERE id = ?', 
            [status, pedidoId]
        );

        connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Status atualizado com sucesso.' }),
        };
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao atualizar o pedido.' }),
        };
    }
};
