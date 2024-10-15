// Definir a função gTime para obter o horário atual
function gTime() {
  const now = new Date();
  return now.toISOString(); // Retorna o horário atual no formato ISO
}

window.onload = function() {
  // Primeira parte: Definir o valor do timestamp
  const timestamp = document.querySelector("#timestamp");
  
  if (timestamp) {
    timestamp.value = gTime();
  } else {
    console.error("Elemento #timestamp não encontrado.");
  }

  // Segunda parte: Preencher o formulário com os dados da URL
  const { name, email } = getQueryParams();

  // Função para capitalizar a primeira letra de cada palavra
  const formattedName = capitalizeFirstLetter(name || '');

  // Preencher os campos com os dados
  if (document.getElementById('name')) {
    document.getElementById('name').value = formattedName;
  }

  if (document.getElementById('email')) {
    document.getElementById('email').value = email || '';
  }

  // Salvar dados no localStorage
  localStorage.setItem('firstName', formattedName);
  localStorage.setItem('email', email || '');
};

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    name: params.get('name') || '',
    email: params.get('email') || ''
  };
}

// Função para capitalizar a primeira letra de cada palavra
function capitalizeFirstLetter(name) {
  return name.replace(/\b\w/g, char => char.toUpperCase());
}

function saveFormData() {
  const firstName = document.getElementById('formattedName')?.value || '';
  const lastName = document.getElementById('last-name')?.value || '';
  const orgTitle = document.getElementById('org-title')?.value || '';
  const email = document.getElementById('email')?.value || '';
  const phone = document.getElementById('phone')?.value || '';
  const organization = document.getElementById('organization')?.value || '';
  const membershipLevel = document.getElementById('membership-level')?.value || '';
  const description = document.getElementById('description')?.value || '';

  // Salva os dados no localStorage
  localStorage.setItem('firstName', firstName);
  localStorage.setItem('lastName', lastName);
  localStorage.setItem('orgTitle', orgTitle);
  localStorage.setItem('email', email);
  localStorage.setItem('phone', phone);
  localStorage.setItem('organization', organization);
  localStorage.setItem('membershipLevel', membershipLevel);
  localStorage.setItem('description', description);
}
