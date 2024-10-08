const fetch = require("node-fetch");

const NETLIFY_TOKEN = "nfp_EerkRmRLGWFpi3CudwvneoPcsx1ayxp2b3f5"; // Seu token
const FORM_ID = "66f5a99aea4c280008f95347"; // ID do formulário de gerar pedido

async function gerarPedido(dadosPedido) {
  const url = `https://api.netlify.com/api/v1/forms/${FORM_ID}/submissions`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NETLIFY_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosPedido),
  });

  if (!response.ok) {
    throw new Error(`Erro ao gerar pedido: ${response.statusText}`);
  }

  const dados = await response.json();
  return dados;
}

// Exemplo de uso
gerarPedido({ item: "Exemplo", quantidade: 10, parceiro: "Fornecedor X" })
  .then((response) => {
    console.log("Pedido gerado com sucesso:", response);
  })
  .catch((error) => {
    console.error(error);
  });
