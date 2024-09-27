const mysql = require('mysql2/promise');

exports.handler = async function (event) {
  const { id } = JSON.parse(event.body);

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
  });

  try {
    await connection.execute('DELETE FROM pedidos WHERE id = ?', [id]);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Pedido excluído com sucesso!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao excluir o pedido' }),
    };
  } finally {
    await connection.end();
  }
};
