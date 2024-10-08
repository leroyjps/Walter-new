<script>
  const NETLIFY_TOKEN = "nfp_EerkRmRLGWFpi3CudwvneoPcsx1ayxp2b3f5"; // Seu token
  const FORM_ID_BUSCAR = "67057b4d13061000082d922c"; // ID do formulário de busca

  let pedidos = [];
  let currentPage = 1;
  const itemsPerPage = 10;

  async function buscarPedidos() {
    const url = `https://api.netlify.com/api/v1/forms/${FORM_ID_BUSCAR}/submissions`;

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

  function atualizarTabela() {
    const tabela = document
      .getElementById("pedidoTable")
      .querySelector("tbody");
    tabela.innerHTML = ""; // Limpa a tabela existente

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pedidosToDisplay = pedidos.slice(start, end); // Pega os pedidos da página atual

    pedidosToDisplay.forEach((pedido, index) => {
      const novaLinha = tabela.insertRow();
      novaLinha.innerHTML = `
                <td>${index + 1}</td>
                <td>${pedido.data.item}</td>
                <td>${pedido.data.quantidade}</td>
                <td>${pedido.data.parceiro}</td>
                <td>${pedido.data.status}</td>
            `;
    });

    // Atualiza a informação da página atual
    document.getElementById("page-info").innerText = `Página ${currentPage} de ${Math.ceil(pedidos.length / itemsPerPage)}`;

    // Habilita ou desabilita os botões de navegação
    document.getElementById("prev-btn").disabled = currentPage === 1;
    document.getElementById("next-btn").disabled = currentPage * itemsPerPage >= pedidos.length;
  }

  // Função para avançar para a próxima página
  function nextPage() {
    if (currentPage * itemsPerPage < pedidos.length) {
      currentPage++;
      atualizarTabela();
    }
  }

  // Função para voltar para a página anterior
  function previousPage() {
    if (currentPage > 1) {
      currentPage--;
      atualizarTabela();
    }
  }

  // Carrega os pedidos ao iniciar a página
  window.onload = async function () {
    try {
      pedidos = await buscarPedidos();
      atualizarTabela();
    } catch (error) {
      console.error(error);
    }
  };
</script>
