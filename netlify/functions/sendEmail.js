/netlify
  /functions
    sendEmail.js
// netlify/functions/sendEmail.js
const postmark = require('postmark');

// Conecte-se à API do Postmark com sua chave de servidor
const client = new postmark.ServerClient('YOUR_POSTMARK_SERVER_API_TOKEN');

exports.handler = async (event, context) => {
    // Verifique o método HTTP, precisa ser POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Método não permitido. Use POST.' })
        };
    }

    // Parse o corpo do request para obter os dados do formulário
    const { name, email, message } = JSON.parse(event.body);

    // Valide os campos do formulário
    if (!name || !email || !message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Todos os campos são obrigatórios.' })
        };
    }

    try {
        // Envie o e-mail com o Postmark
        await client.sendEmail({
            From: 'mauricio.ferreira@walterscheid.com',  // Altere para o seu endereço "From"
            To: 'contato@walterscheid.com',
            Subject: `Novo Contato de ${name}`,
            HtmlBody: `
                <strong>Nome:</strong> ${name}<br/>
                <strong>Email:</strong> ${email}<br/>
                <strong>Mensagem:</strong> ${message}
            `,
            TextBody: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
            MessageStream: "outbound"
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email enviado com sucesso!' })
        };
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Erro ao enviar email.' })
        };
    }
};
