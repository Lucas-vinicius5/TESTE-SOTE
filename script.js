const SPREADSHEET_ID = "1jLGdcmLq-4BgaYwXN9WewsH4slUDTwKA5H4XEsMIv5w";
const SHEET_NAME = "Dados Site";
const API_KEY = "SUA_CHAVE_DA_API"; // Substitua pela sua chave de API

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
                new Date().toLocaleDateString()
            ]
        ]
    };

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:H2:append?valueInputOption=RAW&key=${API_KEY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    alert("Dados incluídos com sucesso!");
    loadData();
}

// Função para carregar dados
async function loadData() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:H?key=${API_KEY}`);
    const data = await response.json();
    renderTable(data.values);
}

// Função para renderizar a tabela
function renderTable(data) {
    const table = document.getElementById("dataTable");
    table.innerHTML = "<table border='1'><tr><th>Número do Pedido</th><th>Cliente</th><th>Código</th><th>Descrição</th><th>Prioridade</th><th>Progresso</th><th>Status</th><th>Data</th></tr>";

    data.forEach(row => {
        table.innerHTML += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td>${row[5]}</td><td>${row[6]}</td><td>${row[7]}</td></tr>`;
    });

    table.innerHTML += "</table>";
}

// Função para pesquisar dados
async function searchData() {
    const searchValue = document.getElementById("searchInput").value;
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A2:H?key=${API_KEY}`);
    const data = await response.json();
    const filteredData = data.values.filter(row => row[0] === searchValue);
    renderTable(filteredData);
}

// Função para apagar dados
async function deleteData() {
    const searchValue = document.getElementById("searchInput").value;
    // Implemente a lógica para apagar dados
    alert("Funcionalidade de apagar ainda não implementada.");
}

// Função para modificar dados
async function updateData() {
    const searchValue = document.getElementById("searchInput").value;
    // Implemente a lógica para modificar dados
    alert("Funcionalidade de modificar ainda não implementada.");
}

// Carregar dados ao iniciar
loadData();
