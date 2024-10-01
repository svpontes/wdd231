const companies = [
    // seu array JSON
  ];
  
  // Função para filtrar membros Silver e Gold e exibir 2 ou 3 aleatórios
  function displaySpotlightCompanies() {
    const spotlightContainer = document.getElementById('spotlight-companies');
  
    // Filtra membros Gold (membershipLevel 3) ou Silver (membershipLevel 2)
    const spotlightMembers = companies.filter(company => company.membershipLevel >= 2);
  
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
  displaySpotlightCompanies();
  