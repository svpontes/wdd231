document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById("myVideo");

    // Parar o vídeo ao terminar
    video.addEventListener("ended", function() {
        video.pause(); // Pausa o vídeo no final
    });

    // Reproduzir o vídeo novamente ao carregar a página
    video.currentTime = 0; // Reseta o tempo do vídeo
    video.play(); // Inicia a reprodução ao carregar a página
});
