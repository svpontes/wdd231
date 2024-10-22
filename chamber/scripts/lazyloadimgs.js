document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar imagens lazy quando entram no viewport
    const lazyImages = document.querySelectorAll('.lazy-load');

    // Verificar suporte ao IntersectionObserver
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const dataSrc = img.getAttribute('data-src');
                    
                    // Verificar se a imagem tem um data-src válido
                    if (dataSrc) {
                        img.src = dataSrc;
                        img.removeAttribute('data-src'); // Remover data-src depois de carregar
                        img.classList.remove('lazy-load');
                        observer.unobserve(img); // Parar de observar a imagem depois que ela for carregada
                    }
                }
            });
        });

        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    } else {
        // Fallback para navegadores sem suporte ao IntersectionObserver
        lazyImages.forEach(image => {
            const dataSrc = image.getAttribute('data-src');
            if (dataSrc) {
                image.src = dataSrc;
                image.removeAttribute('data-src');
                image.classList.remove('lazy-load');
            }
        });
    }
});
