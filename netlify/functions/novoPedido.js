const fetch = require("node-fetch");

const NETLIFY_TOKEN = "nfp_EerkRmRLGWFpi3CudwvneoPcsx1ayxp2b3f5"; // Seu token
const FORM_ID = "670571cd7cd4e90008d77590"; // ID do formulário de novo pedido

async function criarNovoPedido(dadosPedido) {
  const url = `https://api.netlify.com/api/v1/forms/${FORM_ID}/submissions`;

  // Dados que devem ser enviados para o formulário
  const formData = {
    item: dadosPedido.item,
    quantidade: dadosPedido.quantidade,
    parceiro: dadosPedido.parceiro,
    status: dadosPedido.status || "Não Liberado", // Adiciona um valor padrão caso não tenha sido fornecido
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NETLIFY_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Envia os dados do pedido para o Netlify
  });

  // Verifica se a resposta da API foi bem-sucedida
  if (!response.ok) {
    throw new Error(`Erro ao criar novo pedido: ${response.statusText}`);
  }

  const dados = await response.json();
  return dados;
}

// Exemplo de uso da função
criarNovoPedido({ item: "Exemplo", quantidade: 5, parceiro: "Fornecedor Y" })
  .then((response) => {
    console.log("Novo pedido criado com sucesso:", response);
  })
  .catch((error) => {
    console.error("Erro ao criar pedido:", error);
  });

  });
