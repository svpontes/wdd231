// Adiciona evento de clique no ícone de hambúrguer
document.getElementById('hamburguer').addEventListener('click', function() {
    const menu = document.querySelector('nav.button-container');
    menu.classList.toggle('active'); // Adiciona ou remove a classe active
});

const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json'; // URL for prophet data
const cards = document.querySelector('#cards'); // Selects the container where the cards will be displayed

// Asynchronous function to fetch prophet data
async function getProphetData() {
    const response = await fetch(url); // Makes a request to fetch the data
    const data = await response.json(); // Converts the data to JSON format
    displayProphets(data.prophets); // Calls the function to display the prophets
}

// Function to add ordinal suffixes (st, nd, rd, th)
const getOrdinalSuffix = (number) => {
    if (number % 100 >= 11 && number % 100 <= 13) {
        return 'th'; // Special case for numbers 11, 12, and 13
    }
    switch (number % 10) {
        case 1: return 'st'; // For numbers ending in 1
        case 2: return 'nd'; // For numbers ending in 2
        case 3: return 'rd'; // For numbers ending in 3
        default: return 'th'; // For all other numbers
    }
};

// Select filter buttons
const all = document.querySelector("#all");
const idaho = document.querySelector("#idaho");
const nonus = document.querySelector("#nonus");
const ten = document.querySelector("#ten");
const childs = document.querySelector("#childs");
const childl = document.querySelector("#childl");
const old = document.querySelector("#old");




// Function to calculate age at death in years
const getAgeAtDeathInYears = (birthdate, deathdate) => {
    const birth = new Date(birthdate); // Converts the birthdate into a Date object
    const death = deathdate ? new Date(deathdate) : new Date(); // If no death date, assume current date
    return death.getFullYear() - birth.getFullYear(); // Returns the difference in years
};

// Function to apply filters
const getProphets = async (filter = "all") => {
    const response = await fetch(url); // Fetches prophet data
    let prophets = await response.json();
    prophets = prophets.prophets; // Accesses the array of prophets

    // Applies the filter based on the clicked button
    switch (filter) {
        case "idaho":
            prophets = prophets.filter((prophet) => prophet.birthplace === "Idaho"); // Filters prophets born in Idaho
            break;
        case "nonus":
                prophets = prophets.filter((prophet) => prophet.birthplace ==="England");
            break;
        case "ten":
            prophets = prophets.filter((prophet) => prophet.length >= 15); // Filters those who served 15 or more years
            break;
        case "childs":
            prophets = prophets.filter((prophet) => prophet.numofchildren < 5); // Filters those with fewer than 5 children
            break;
        case "childl":
            prophets = prophets.filter((prophet) => prophet.numofchildren >= 10); // Filters those with 10 or more children
            break;
        case "old":
            prophets = prophets.filter(
                (prophet) => getAgeAtDeathInYears(prophet.birthdate, prophet.death) >= 95 // Filters those who lived 95 years or more
            );
            break;
        default:
            break;
    }

    displayProphets(prophets); // Displays the prophets after filtering
};

// Function to display the prophets
const displayProphets = (prophets) => {
    cards.innerHTML = ''; // Clears existing cards

    prophets.forEach((prophet) => {
        // Creates a card for each prophet
        let card = document.createElement('section'); // Creates the card element
        card.classList.add('card'); // Adds the 'card' class for styling

        let fullName = document.createElement('h2'); // Creates the h2 element for the full name
        const suffix = getOrdinalSuffix(prophet.order); // Gets the ordinal suffix
        fullName.textContent = `${prophet.name} ${prophet.lastname} - ${prophet.order}${suffix} Latter-day Prophet`; // Full name with order and suffix

        let portrait = document.createElement('img'); // Creates the img element for the portrait
        portrait.setAttribute('src', prophet.imageurl); // Sets the image URL
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}${suffix} Latter-day Prophet`); // Alternative text
        portrait.setAttribute('loading', 'lazy'); // Lazy loading attribute

        // Creates a paragraph to display additional data
        let details = document.createElement('p');
        details.innerHTML = `
            <strong>Birthdate:</strong> ${prophet.birthdate}<br>
            <strong>Death:</strong> ${prophet.death ? prophet.death : "N/A"}<br>
            <strong>Length of Service:</strong> ${prophet.length} years<br>
            <strong>Order:</strong> ${prophet.order}<br>
            <strong>Birthplace:</strong> ${prophet.birthplace}<br>
            <strong>Number of Children:</strong> ${prophet.numofchildren}
        `; // Adds the details with formatting

        // Appends the name, image, and details to the card
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(details);

        // Appends the card to the cards container
        cards.appendChild(card);
    });
};

// Adds click event listeners to the buttons
all.addEventListener('click', () => getProphets("all"));
idaho.addEventListener('click', () => getProphets("idaho"));
nonus.addEventListener('click', () => getProphets("nonus"));
ten.addEventListener('click', () => getProphets("ten"));
childs.addEventListener('click', () => getProphets("childs"));
childl.addEventListener('click', () => getProphets("childl"));
old.addEventListener('click', () => getProphets("old"));

// Calls the function to fetch and display the data
getProphetData();


//Código comentado:
/*
const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json'; // URL dos dados dos profetas
const cards = document.querySelector('#cards'); // Seleciona o contêiner onde os cartões serão exibidos

// Função assíncrona para buscar os dados dos profetas
async function getProphetData() {
    const response = await fetch(url); // Faz uma requisição para buscar os dados
    const data = await response.json(); // Converte os dados para formato JSON
    displayProphets(data.prophets); // Chama a função para exibir os profetas
}

// Função para adicionar sufixos ordinais (st, nd, rd, th)
const getOrdinalSuffix = (number) => {
    if (number % 100 >= 11 && number % 100 <= 13) {
        return 'th'; // Caso especial para números 11, 12 e 13
    }
    switch (number % 10) {
        case 1: return 'st'; // Para números que terminam em 1
        case 2: return 'nd'; // Para números que terminam em 2
        case 3: return 'rd'; // Para números que terminam em 3
        default: return 'th'; // Para todos os outros números
    }
};

// Seleciona os botões de filtro
const all = document.querySelector("#all");
const idaho = document.querySelector("#idaho");
const nonus = document.querySelector("#nonus");
const ten = document.querySelector("#ten");
const childs = document.querySelector("#childs");
const childl = document.querySelector("#childl");
const old = document.querySelector("#old");

// Função para calcular a idade no momento da morte em anos
const getAgeAtDeathInYears = (birthdate, deathdate) => {
    const birth = new Date(birthdate); // Converte a data de nascimento em objeto Date
    const death = deathdate ? new Date(deathdate) : new Date(); // Se não houver data de morte, assume a data atual
    return death.getFullYear() - birth.getFullYear(); // Retorna a diferença em anos
};

// Função para aplicar filtros
const getProphets = async (filter = "all") => {
    const response = await fetch(url); // Busca os dados dos profetas
    let prophets = await response.json();
    prophets = prophets.prophets; // Acessa o array de profetas

    // Aplica o filtro baseado no botão clicado
    switch (filter) {
        case "idaho":
            prophets = prophets.filter((prophet) => prophet.birthplace === "Idaho"); // Filtra os nascidos em Idaho
            break;
        case "nonus":
            prophets = prophets.filter((prophet) => prophet.birthplace !== "Idaho" && prophet.birthplace !== "USA"); // Filtra os nascidos fora dos EUA e Idaho
            break;
        case "ten":
            prophets = prophets.filter((prophet) => prophet.length >= 15); // Filtra os que serviram por 15 anos ou mais
            break;
        case "childs":
            prophets = prophets.filter((prophet) => prophet.numofchildren < 5); // Filtra os que têm menos de 5 filhos
            break;
        case "childl":
            prophets = prophets.filter((prophet) => prophet.numofchildren >= 10); // Filtra os que têm 10 ou mais filhos
            break;
        case "old":
            prophets = prophets.filter(
                (prophet) => getAgeAtDeathInYears(prophet.birthdate, prophet.death) >= 95 // Filtra os que viveram 95 anos ou mais
            );
            break;
        default:
            break;
    }

    displayProphets(prophets); // Exibe os profetas após aplicar o filtro
};

// Função para exibir os profetas
const displayProphets = (prophets) => {
    cards.innerHTML = ''; // Limpa os cartões existentes

    prophets.forEach((prophet) => {
        // Cria um cartão para cada profeta
        let card = document.createElement('section'); // Cria o elemento de cartão
        card.classList.add('card'); // Adiciona a classe 'card' para estilos

        let fullName = document.createElement('h2'); // Cria o elemento h2 para o nome completo
        const suffix = getOrdinalSuffix(prophet.order); // Obtém o sufixo ordinal
        fullName.textContent = `${prophet.name} ${prophet.lastname} - ${prophet.order}${suffix} Latter-day Prophet`; // Nome completo com ordem e sufixo

        let portrait = document.createElement('img'); // Cria o elemento img para o retrato
        portrait.setAttribute('src', prophet.imageurl); // Define a URL da imagem
        portrait.setAttribute('alt', `Retrato de ${prophet.name} ${prophet.lastname} - ${prophet.order}${suffix} Profeta dos Últimos Dias`); // Texto alternativo
        portrait.setAttribute('loading', 'lazy'); // Atributo de carregamento preguiçoso

        // Cria um parágrafo para exibir os dados adicionais
        let details = document.createElement('p');
        details.innerHTML = `
            <strong>Data de nascimento:</strong> ${prophet.birthdate}<br>
            <strong>Data de falecimento:</strong> ${prophet.death ? prophet.death : "N/A"}<br>
            <strong>Tempo de serviço:</strong> ${prophet.length} anos<br>
            <strong>Ordem:</strong> ${prophet.order}<br>
            <strong>Local de nascimento:</strong> ${prophet.birthplace}<br>
            <strong>Número de filhos:</strong> ${prophet.numofchildren}
        `; // Adiciona os detalhes formatados

        // Adiciona o nome, imagem e detalhes ao cartão
        card.appendChild(fullName);
        card.appendChild(portrait);
        card.appendChild(details);

        // Adiciona o cartão ao contêiner de cartões
        cards.appendChild(card);
    });
};

// Adiciona eventos de clique aos botões
all.addEventListener('click', () => getProphets("all"));
idaho.addEventListener('click', () => getProphets("idaho"));
nonus.addEventListener('click', () => getProphets("nonus"));
ten.addEventListener('click', () => getProphets("ten"));
childs.addEventListener('click', () => getProphets("childs"));
childl.addEventListener('click', () => getProphets("childl"));
old.addEventListener('click', () => getProphets("old"));

// Chama a função para buscar e exibir os dados
getProphetData();

*/