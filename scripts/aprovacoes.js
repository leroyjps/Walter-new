document.addEventListener('DOMContentLoaded', function () {
    const approvalList = document.getElementById('approval-list');

    // URL da API REST do SharePoint para obter os dados da lista "Historico de compras" no caminho correto
    const apiUrl = "https://comeronline.sharepoint.com/sites/WPG_BRAZIL/_api/web/lists/getbytitle('Historico%20de%20compras')/items";

    // Fetch para buscar os dados da lista do SharePoint
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json;odata=verbose',
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Substitua pelo token de acesso adequado
        }
    })
    .then(response => response.json())
    .then(data => {
        const items = data.d.results;
        approvalList.innerHTML = ''; // Limpa a mensagem de carregamento

        // Cria um elemento para cada item da lista
        items.forEach(item => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');
            listItem.innerHTML = `
                <h3>Compra: ${item.Title}</h3>
                <p>Valor: R$ ${item.Valor}</p>
                <p>Data: ${new Date(item.Data).toLocaleDateString()}</p>
            `;
            approvalList.appendChild(listItem);
        });
    })
    .catch(error => {
        approvalList.innerHTML = '<p>Erro ao carregar dados</p>';
        console.error('Erro ao buscar dados do SharePoint:', error);
    });
});
