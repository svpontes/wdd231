window.addEventListener('load', () => {
    const video = document.getElementById('myVideo');
    const welcomeText = document.getElementById('welcome-text');
  
    // Espera a animação terminar antes de mostrar o vídeo
    welcomeText.addEventListener('animationend', () => {
      welcomeText.style.display = 'none';
      video.style.display = 'block';
      video.play(); // Toca o vídeo após a animação
    });
  });
  