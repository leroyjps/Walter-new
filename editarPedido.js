const mysql = require('mysql2/promise');

exports.handler = async function (event) {
  const { id, item, quantidade, parceiro, status } = JSON.parse(event.body);

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
  });

  try {
    await connection.execute(
      'UPDATE pedidos SET item = ?, quantidade = ?, parceiro = ?, status = ?, data_liberacao = IF(?, NOW(), data_liberacao) WHERE id = ?',
      [item, quantidade, parceiro, status, status === 'Liberado', id]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Pedido atualizado com sucesso!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao atualizar o pedido' }),
    };
  } finally {
    await connection.end();
  }
};
