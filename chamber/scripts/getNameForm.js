function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      firstName: params.get('first-name') || '',
      email: params.get('email') || ''
    };
  }

  // Função para capitalizar a primeira letra de cada palavra
  function capitalizeFirstLetter(name) {
    return name.replace(/\b\w/g, char => char.toUpperCase());//b boudary, w representa any letter after b
  }

  // Preencher automaticamente o formulário com os dados da URL
  window.onload = function() {
    const { firstName, email } = getQueryParams();

    // Formatar o nome com a primeira letra maiúscula
    const formattedName = capitalizeFirstLetter(firstName);

    // Preencher os campos com os dados
    document.getElementById('first-name').value = formattedName;
    document.getElementById('email').value = email;
      
    // Salvar dados no localStorage
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('email', email);
  };

  function saveFormData() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const orgTitle = document.getElementById('org-title').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const organization = document.getElementById('organization').value;
    const membershipLevel = document.getElementById('membership-level').value;
    const description = document.getElementById('description').value;

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
