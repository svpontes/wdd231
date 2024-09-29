
// Dynamically set the last modified date
document.getElementById('lastModified').textContent = `(Last modified: ${document.lastModified})`;

// Toggle the mobile menu
document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-container');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');
    const directoryJSON = '/WDD231/chamber/data/member.json'; // Caminho do JSON

    async function fetchMembers() {
        try {
            const response = await fetch(directoryJSON);
            const members = await response.json();
            renderMembers(members);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    }

    const renderMembers = (members) => {
        membersContainer.innerHTML = ''; // Limpa o contêiner

        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');

            // Criação dos elementos
            const memberImg = document.createElement('img');
            memberImg.src = member.icon;
            memberImg.alt = `${member.name} Logo`;

            const memberName = document.createElement('h2');
            memberName.textContent = member.name;

            const memberAddress = document.createElement('p');
            memberAddress.textContent = member.address;

            const memberPhone = document.createElement('p');
            memberPhone.textContent = member.phone;

            const memberWebsite = document.createElement('p');
            const websiteLink = document.createElement('a');
            websiteLink.href = member.website;
            websiteLink.target = "_blank";
            websiteLink.textContent = "Visit Website";
            memberWebsite.appendChild(websiteLink);

            const membershipLevel = document.createElement('p');
            membershipLevel.textContent = `Membership Level: ${member.membershipLevel}`;

            const additionalInfo = document.createElement('p');
            additionalInfo.textContent = member.additionalInfo.description;

            // Adiciona os elementos ao card
            memberCard.appendChild(memberImg);
            memberCard.appendChild(memberName);
            memberCard.appendChild(memberAddress);
            memberCard.appendChild(memberPhone);
            memberCard.appendChild(memberWebsite);
            memberCard.appendChild(membershipLevel);
            memberCard.appendChild(additionalInfo);

            membersContainer.appendChild(memberCard);
        });
    };

    gridViewButton.addEventListener('click', () => {
        membersContainer.classList.add('grid-view');
        membersContainer.classList.remove('list-view');
        fetchMembers(); // Atualiza os membros ao mudar para grade
    });

    listViewButton.addEventListener('click', () => {
        membersContainer.classList.add('list-view');
        membersContainer.classList.remove('grid-view');
        fetchMembers(); // Atualiza os membros ao mudar para lista
    });

    // Chama a função para buscar os membros ao carregar a página
    fetchMembers();
});
