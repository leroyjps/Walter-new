const mysql = require('mysql2/promise');

exports.handler = async function () {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
  });

  try {
    const [rows] = await connection.execute('SELECT * FROM pedidos ORDER BY data_entrada DESC');

    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao buscar os pedidos' }),
    };
  } finally {
    await connection.end();
  }
};
