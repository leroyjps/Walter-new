const mysql = require('mysql2/promise');
require('dotenv').config();

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    let pedidoId, status;
    try {
        const { pedidoId: bodyPedidoId, status: bodyStatus } = JSON.parse(event.body);
        pedidoId = bodyPedidoId;
        status = bodyStatus;
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Dados inválidos. Verifique o formato da requisição.' }),
        };
    }

    if (!pedidoId || !status) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'ID do pedido e status são obrigatórios.' }),
        };
    }

    try {
        // Conexão com o banco de dados
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        // Atualizar o status do pedido no banco de dados
        const [result] = await connection.execute(
            'UPDATE pedidos SET status = ? WHERE id = ?', 
            [status, pedidoId]
        );

        // Verificar se algum pedido foi atualizado
        if (result.affectedRows === 0) {
            connection.end();
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Pedido não encontrado.' }),
            };
        }

        // Fechar a conexão com o banco de dados
        await connection.end();

        // Retorno de sucesso
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

