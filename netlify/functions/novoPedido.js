const fetch = require("node-fetch");

const NETLIFY_TOKEN = "nfp_EerkRmRLGWFpi3CudwvneoPcsx1ayxp2b3f5"; // Seu token
const FORM_ID = "66f5aab9cc04560008a705de"; // ID do formulário de novo pedido

async function criarNovoPedido(dadosPedido) {
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
    throw new Error(`Erro ao criar novo pedido: ${response.statusText}`);
  }

  const dados = await response.json();
  return dados;
}

// Exemplo de uso
criarNovoPedido({ item: "Exemplo", quantidade: 5, parceiro: "Fornecedor Y" })
  .then((response) => {
    console.log("Novo pedido criado com sucesso:", response);
  })
  .catch((error) => {
    console.error(error);
  });
