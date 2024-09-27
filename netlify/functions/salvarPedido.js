const mysql = require('mysql2/promise');

exports.handler = async function (event, context) {
  const { item, quantidade, parceiro } = JSON.parse(event.body);

  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
  });

  try {
    const [rows] = await connection.execute(
      'INSERT INTO pedidos (item, quantidade, parceiro, status, data_entrada) VALUES (?, ?, ?, ?, NOW())',
      [item, quantidade, parceiro, 'Não Liberado']
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Pedido salvo com sucesso!', id: rows.insertId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao salvar o pedido' }),
    };
  } finally {
    await connection.end();
  }
};
