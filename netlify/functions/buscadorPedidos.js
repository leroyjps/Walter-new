const mysql = require('mysql2/promise');
require('dotenv').config();

exports.handler = async (event, context) => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const [rows] = await connection.execute('SELECT * FROM pedidos ORDER BY dataEntrada DESC');
        connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao buscar pedidos' }),
        };
    }
};
