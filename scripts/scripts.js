
// Dynamically set the current year
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Dynamically set the last modified date
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;
//hamburguer

document.getElementById('hamburguer').addEventListener('click', function(){
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});