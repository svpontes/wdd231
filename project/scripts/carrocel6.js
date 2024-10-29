document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".carrocel .slide");
    const prevButton = document.querySelector(".carrocel-button.prev");
    const nextButton = document.querySelector(".carrocel-button.next");
    const carouselContainer = document.querySelector(".carrocel");
    const header = document.querySelector("header");
    /*const title1 = document.querySelector(".welcome-title"); // Seleciona o header*/
    let currentIndex = 0;

    // Função para atualizar o slide ativo e as cores de fundo
    function updateSlide(index) {
        slides.forEach((slide, i) => {
            const isActive = i === index;
            slide.classList.toggle("active", isActive);
            slide.style.display = isActive ? "block" : "none";

            // Atualiza o valor da variável CSS --background do slide ativo no carrossel e no header
            if (isActive) {
                const backgroundColor = window.getComputedStyle(slide).getPropertyValue("--background").trim();
                if (backgroundColor) {
                    carouselContainer.style.setProperty("--background", backgroundColor);
                    header.style.setProperty("--background", backgroundColor);
                    /*title1.style.setProperty("--background", backgroundColor);*/
                }
            }
        });
    }

    // Exibe a imagem inicial e define o fundo do carrossel e do header
    updateSlide(currentIndex);

    // Evento para o botão "prev"
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateSlide(currentIndex);
    });

    // Evento para o botão "next"
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateSlide(currentIndex);
    });
});
