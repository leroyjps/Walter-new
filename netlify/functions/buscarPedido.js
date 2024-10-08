const fetch = require("node-fetch");

const NETLIFY_TOKEN = "nfp_EerkRmRLGWFpi3CudwvneoPcsx1ayxp2b3f5"; // Seu token
const FORM_ID = "66fac53f27d3ee00088634c6"; // ID do formulário de pedidos

async function buscarPedidos() {
  const url = `https://api.netlify.com/api/v1/forms/${FORM_ID}/submissions`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${NETLIFY_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar pedidos: ${response.statusText}`);
  }

  const dados = await response.json();
  return dados;
}

// Exemplo de uso
buscarPedidos()
  .then((pedidos) => {
    console.log("Pedidos:", pedidos);
  })
  .catch((error) => {
    console.error(error);
  });
