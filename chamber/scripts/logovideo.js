document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("myVideo");
    const image = document.getElementById("fadeImage");

    // Ensure the image is loaded before displaying
    image.addEventListener('load', function() {
        video.addEventListener('loadedmetadata', function() {
            video.addEventListener("play", function () {
                image.classList.add("show");
            });

            video.addEventListener("timeupdate", function () {
                const fadeOutStartTime = Math.max(video.duration - 2, 0); // Ensure non-negative
                if (video.currentTime >= fadeOutStartTime) {
                    image.classList.remove("show");
                }
            });
        });
    });
});