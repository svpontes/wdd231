//hamburguer

// Seleciona os elementos
const hamburger = document.querySelector('.hamburger');
const close = document.querySelector('.close');
const menu = document.querySelector('nav.menu');

// Função para verificar o tamanho da tela e exibir ou ocultar o ícone do hambúrguer
function handleResize() {
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches; // Define o tamanho máximo para telas menores
    if (isSmallScreen) {
        hamburger.style.display = 'block'; // Exibe o ícone do hambúrguer em telas menores
        close.style.display = 'none'; // Garante que o ícone de fechar não esteja visível
    } else {
        hamburger.style.display = 'none'; // Oculta o ícone do hambúrguer em telas maiores
        close.style.display = 'none'; // Oculta o ícone de fechar em telas maiores
        menu.classList.remove('show'); // Garante que o menu esteja oculto em telas maiores
    }
}
// Executa a função ao carregar a página e ao redimensionar a tela
window.addEventListener('DOMContentLoaded', handleResize);
window.addEventListener('resize', handleResize);

// Adiciona evento de clique no ícone do hambúrguer
hamburger.addEventListener('click', () => {
    menu.classList.add('show'); // Mostra o menu
    hamburger.style.display = 'none'; // Esconde o ícone do hambúrguer
    close.style.display = 'block'; // Mostra o ícone de fechar
});

// Adiciona evento de clique no ícone de fechar
close.addEventListener('click', () => {
    menu.classList.remove('show'); // Esconde o menu
    hamburger.style.display = 'block'; // Mostra o ícone do hambúrguer
    close.style.display = 'none'; // Esconde o ícone de fechar
});

const directoryJSON = "data/member.json"; // Caminho para o JSON
const cards = document.querySelector("#cards"); // Seleciona o contêiner para os cartões

const gridButton = document.querySelector("#gridView"); // Botão de grid
const listButton = document.querySelector("#listView"); // Botão de lista

// Define que a página carregue no estilo "list-view"
window.addEventListener('DOMContentLoaded', () => {
    cards.classList.add("list-view"); // Adiciona a classe list-view ao carregar a página
    cards.classList.remove("grid-view"); // Garante que o grid-view não esteja aplicado por padrão

    // Esconde as imagens ao carregar no modo list-view
    const images = cards.querySelectorAll("img");
    images.forEach(img => {
        img.style.display = 'none'; // Esconde as imagens ao carregar
    });
});

async function getCompaniesData(directoryJSON) {
    try {
        const response = await fetch(directoryJSON);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayCompanies(data); // Chama a função para exibir as empresas
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Erro ao carregar os dados. Por favor, tente novamente mais tarde."); // Notifica o usuário
    }
}

// Chama a função ao carregar a página
getCompaniesData(directoryJSON);

// Função para exibir os dados das empresas
const displayCompanies = (companies) => {
    cards.innerHTML = ""; // Limpa o contêiner de cartões

    companies.forEach(company => {
        const card = document.createElement("section");
        card.classList.add("member-card"); // Adiciona a classe para estilo

        const companyImg = document.createElement("img");
        const companyName = document.createElement("h2");
        const companyAddress = document.createElement("p");
        const companyPhone = document.createElement("p");
        const companyUrl = document.createElement("a");

        companyImg.setAttribute("src", company.icon);
        companyImg.setAttribute("alt", company.name);
        companyImg.setAttribute("loading", "lazy");
        companyImg.setAttribute("width", "150");
        companyImg.setAttribute("height", "150");

        companyName.innerHTML = company.name;
        companyAddress.innerHTML = company.address;
        companyPhone.classList.add("phone");
        companyPhone.innerHTML = company["phone"];

        // Define o link URL
        if (company.website) {
            companyUrl.setAttribute("href", company.website);
            companyUrl.setAttribute("target", "_blank");
            companyUrl.innerHTML = company.website;
        } else {
            companyUrl.innerHTML = "Website não disponível"; // Caso o campo não exista
        }

        // Adiciona os elementos ao cartão
        card.appendChild(companyImg);
        card.appendChild(companyName);
        card.appendChild(companyAddress);
        card.appendChild(companyPhone);
        card.appendChild(companyUrl);

        cards.appendChild(card); // Adiciona o cartão ao contêiner
    });
}

// Event listeners para alternar entre grid e list view
gridButton.addEventListener("click", () => {
    cards.classList.add("grid-view"); // Adiciona a classe grid-view
    cards.classList.remove("list-view"); // Remove a classe list-view
    // Exibe as imagens novamente ao mudar para grid
    const images = cards.querySelectorAll("img");
    images.forEach(img => {
        img.style.display = 'block'; // Mostra as imagens
    });
});

listButton.addEventListener("click", () => {
    cards.classList.add("list-view"); // Adiciona a classe list-view
    cards.classList.remove("grid-view"); // Remove a classe grid-view
    // Esconde as imagens ao mudar para list
    const images = cards.querySelectorAll("img");
    images.forEach(img => {
        img.style.display = 'none'; // Esconde as imagens
    });
});

// Exibe o ano atual e a última modificação
document.getElementById("current-year").innerHTML = `${new Date().getFullYear()}`;
document.getElementById("lastModified").textContent = `Last modification: ${new Date(document.lastModified).toLocaleDateString()}`;
