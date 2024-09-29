
// Dynamically set the last modified date
document.getElementById('lastModified').textContent = `(Last modified: ${document.lastModified})`;

// Toggle the mobile menu
const hamburger = document.querySelector('.hamburger');
const closeBtn = document.querySelector('.close');
const menuContainer = document.querySelector('.menu-container');

hamburger.addEventListener('click', () => {
  menuContainer.classList.add('menu-open');
});

closeBtn.addEventListener('click', () => {
  menuContainer.classList.remove('menu-open');
});

//grid elements cards

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-container');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
  
    async function fetchMembers() {
      try {
        const response = await fetch('WDD231/chamber/data/member.json');
        const members = await response.json();
        renderMembers(members);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    }
  
    function renderMembers(members) {
      membersContainer.innerHTML = ''; // Limpa o contêiner
  
      members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
  
        memberCard.innerHTML = `
          <img src="${member.icon}" alt="${member.name} Logo">
          <h2>${member.name}</h2>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <p><a href="${member.website}" target="_blank">Visit Website</a></p>
          <p>Membership Level: ${member.membershipLevel}</p>
          <p>${member.additionalInfo.description}</p>
        `;
        
        membersContainer.appendChild(memberCard);
      });
    }
  
    gridViewButton.addEventListener('click', () => {
      membersContainer.classList.add('grid-view');
      membersContainer.classList.remove('list-view');
    });
  
    listViewButton.addEventListener('click', () => {
      membersContainer.classList.add('list-view');
      membersContainer.classList.remove('grid-view');
    });
  
    // Chama a função para buscar os membros ao carregar a página
    fetchMembers();
  });
  
