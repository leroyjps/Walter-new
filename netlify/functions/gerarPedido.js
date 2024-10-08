const fetch = require("node-fetch");

const NETLIFY_TOKEN = "nfp_EerkRmRLGWFpi3CudwvneoPcsx1ayxp2b3f5"; // Seu token
const FORM_ID = "66f5a99aea4c280008f95347"; // ID do formulário de gerar pedido

// Função para gerar o pedido via API do Netlify
async function gerarPedido(dadosPedido) {
  const url = `https://api.netlify.com/api/v1/forms/${FORM_ID}/submissions`;

  // Mapeamento dos dados do pedido para os campos do formulário
  const formData = {
    item: dadosPedido.item,
    quantidade: dadosPedido.quantidade,
    parceiro: dadosPedido.parceiro,
    status: dadosPedido.status || "Não Liberado", // Caso não fornecido, coloca "Não Liberado" como padrão
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NETLIFY_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData), // Envia os dados do pedido para o Netlify
  });

  // Verifica se a resposta da API é positiva
  if (!response.ok) {
    throw new Error(`Erro ao gerar pedido: ${response.statusText}`);
  }

  // Retorna a resposta da API em formato JSON
  const dados = await response.json();
  return dados;
}

// Exemplo de uso da função
gerarPedido({ item: "Exemplo", quantidade: 10, parceiro: "Fornecedor X", status: "Liberado" })
  .then((response) => {
    console.log("Pedido gerado com sucesso:", response);
  })
  .catch((error) => {
    console.error("Erro ao gerar pedido:", error);
  });
