async function loadCompanies() {
  try {
    const response = await fetch('./chamber/data/member.json'); // Faz a requisição para o arquivo JSON

    if (!response.ok) {
      throw new Error(`Erro ao carregar o arquivo: ${response.status}`);
    }

    const companies = await response.json(); // Converte a resposta para JSON

    // Chama a função para exibir os membros
    displaySpotlightCompanies(companies);
  } catch (error) {
    console.error("Erro ao carregar os membros:", error);
  }
}

// Função para filtrar membros Silver e Gold e exibir 2 ou 3 aleatórios
function displaySpotlightCompanies(companies) {
  const spotlightContainer = document.getElementById('spotlights-filter');
  spotlightContainer.innerHTML = ''; // Limpa o container

  // Filtra membros Gold (membershipLevel 3) ou Silver (membershipLevel 2)
  const spotlightMembers = companies.filter(company => company.membershipLevel >= 3);

  // Embaralha os membros e seleciona 2 ou 3 aleatórios
  const shuffledMembers = spotlightMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

  shuffledMembers.forEach(company => {
    const spotlightCard = document.createElement('div');
    spotlightCard.classList.add('spotlight-card');
    spotlightCard.innerHTML = `
      <img src="${company.icon}" alt="${company.name}" width="100" height="100">
      <h3>${company.name}</h3>
      <p>${company.address}</p>
      <p>${company.phone}</p>
      <a href="${company.website}" target="_blank">Visit Website</a>
      <p><strong>Membership Level:</strong> ${company.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
    `;
    spotlightContainer.appendChild(spotlightCard);
  });
}

// Chame a função ao carregar a página
loadCompanies();
