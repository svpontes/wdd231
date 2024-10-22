// LocalStorage Visit Counter
const visitorControl = document.getElementById('visitor-control');
const lastVisit = localStorage.getItem('lastVisit');
const today = new Date().getTime();

if (lastVisit) {
    const daysSinceLastVisit = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
    let message = '';

    if (daysSinceLastVisit === 0) {
        message = 'Back so soon! Awesome!';
    } else if (daysSinceLastVisit === 1) {
        message = 'You last visited 1 day ago.';
    } else {
        message = `You last visited ${daysSinceLastVisit} days ago.`;
    }

    visitorControl.textContent = message;
} else {
    visitorControl.textContent = 'Welcome! Let us know if you have any questions.';
}

localStorage.setItem('lastVisit', today);