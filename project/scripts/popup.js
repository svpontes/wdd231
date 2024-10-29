document.getElementById("form").onsubmit = function(event) {
    event.preventDefault(); // Evita o envio do formulário
    document.getElementById("overlay").style.display = "block"; // Exibe o fundo escurecido
    document.getElementById("popup").style.display = "block";   // Exibe o pop-up
    
    // Limpa o formulário
    document.getElementById("form").reset();
};

document.querySelector(".close-btn").onclick = function() {
    document.getElementById("overlay").style.display = "none"; // Esconde o fundo escurecido
    document.getElementById("popup").style.display = "none";   // Esconde o pop-up
};
