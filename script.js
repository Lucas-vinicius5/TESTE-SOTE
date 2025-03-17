const SPREADSHEET_ID = "1jLGdcmLq-4BgaYwXN9WewsH4slUDTwKA5H4XEsMIv5w"; // ID da sua planilha
const SHEET_NAME = "Dados Site"; // Nome da aba
const API_KEY = "AIzaSyDJcmG7-_yl0TXrbRbF6u4U0lfvmL-SXhA"; // Sua chave de API

// Função para incluir dados
async function insertData() {
    const data = {
        values: [
            [
                document.getElementById("numeroPedido").value,
                document.getElementById("cliente").value,
                document.getElementById("codigo").value,
                document.getElementById("descricao").value,
                document.getElementById("prioridade").value,
                document.getElementById("progresso").value,
                document.getElementById("status").value,
                new Date().toLocaleDateString() // Data atual
            ]
        ]
    };

    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:H2:append?valueInputOption=RAW&key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        const result = await response.json();
        console.log(result); // Verifique o resultado no console
        alert("Dados incluídos com sucesso!");
        loadData(); // Recarrega os dados após a inserção
    } catch (error) {
        console.error("Erro ao incluir dados:", error);
        alert("Erro ao incluir dados. Verifique o console para mais detalhes.");
    }
}

// Função para carregar dados
async function loadData() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:H?key=${API_KEY}`
        );
        const data = await response.json();
        renderTable(data.values); // Renderiza os dados na tabela
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar dados. Verifique o console para mais detalhes.");
    }
}

// Função para renderizar a tabela
function renderTable(data) {
    const table = document.getElementById("dataTable");
    if (!data || data.length === 0) {
        table.innerHTML = "<p>Nenhum dado encontrado.</p>";
        return;
    }

    let html = "<table border='1'><tr><th>Número do Pedido</th><th>Cliente</th><th>Código</th><th>Descrição</th><th>Prioridade</th><th>Progresso</th><th>Status</th><th>Data</th></tr>";

    data.forEach(row => {
        html += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>${row[5]}</td><td>${row[6]}</td><td>${row[7]}</td></tr>`;
    });

    html += "</table>";
    table.innerHTML = html;
}

// Função para pesquisar dados
async function searchData() {
    const searchValue = document.getElementById("searchInput").value;
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:H?key=${API_KEY}`
        );
        const data = await response.json();
        const filteredData = data.values.filter(row => row[0] === searchValue); // Filtra pelo número do pedido
        renderTable(filteredData); // Renderiza os dados filtrados
    } catch (error) {
        console.error("Erro ao pesquisar dados:", error);
        alert("Erro ao pesquisar dados. Verifique o console para mais detalhes.");
    }
}

// Função para apagar dados (ainda não implementada)
async function
