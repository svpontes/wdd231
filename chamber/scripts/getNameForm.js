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
  };