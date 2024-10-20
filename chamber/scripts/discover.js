document.addEventListener("DOMContentLoaded", function () {
    // Lazy loading de imagens
    const lazyImages = document.querySelectorAll('.lazy-load');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;

                // Adiciona a classe 'loaded' após o carregamento da imagem
                image.onload = () => {
                    image.classList.add('loaded');
                };
                observer.unobserve(image); // Para de observar a imagem após carregada
            }
        });
    });

    lazyImages.forEach(image => {
        imageObserver.observe(image);
    });

    // Gerenciar item selecionado na sidebar
    document.querySelector('.local-section').classList.add('selected');

    // Mensagem de visitante baseada na última visita
    const lastVisit = localStorage.getItem('last-visit');
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // Milissegundos em um dia
    let message = '';

    if (lastVisit) {
        const lastVisitTime = parseInt(lastVisit); 
        const timeDifference = now - lastVisitTime;
        const daysSinceLastVisit = Math.floor(timeDifference / oneDay);

        if (timeDifference < oneDay) {
            message = 'Back so soon! Awesome!';
        } else if (daysSinceLastVisit === 1) {
            message = 'You last visited 1 day ago.';
        } else {
            message = `You last visited ${daysSinceLastVisit} days ago.`;
        }
    } else {
        message = 'Welcome! Let us know if you have any questions.';
    }

    document.getElementById('visitor-message').textContent = message;
    localStorage.setItem('last-visit', now);

    // Calendário
    const calendar = document.getElementById('calendar');
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    // Função para renderizar o calendário
    function renderCalendar(month, year) {
        calendar.innerHTML = ''; // Limpar calendário anterior
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const currentDate = new Date().getDate();
        const today = new Date().getMonth() === month && new Date().getFullYear() === year;

        // Cabeçalho do calendário
        const calendarHeader = document.createElement('div');
        calendarHeader.classList.add('calendar-header');
        calendarHeader.innerHTML = `
            <button id="prev-month">&laquo;</button>
            <div>${monthNames[month]} ${year}</div>
            <button id="next-month">&raquo;</button>
        `;
        calendar.appendChild(calendarHeader);

        // Labels dos dias da semana
        const dayLabelContainer = document.createElement('div');
        dayLabelContainer.classList.add('calendar-days');
        daysInWeek.forEach(day => {
            const dayLabel = document.createElement('div');
            dayLabel.textContent = day;
            dayLabel.style.fontWeight = 'bold';
            dayLabelContainer.appendChild(dayLabel);
        });
        calendar.appendChild(dayLabelContainer);

        // Grade de dias do mês
        const dayContainer = document.createElement('div');
        dayContainer.classList.add('calendar-days');

        // Células vazias para os dias antes do início do mês
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            dayContainer.appendChild(emptyCell);
        }

        // Células para os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = day;

            // Destaca o dia atual
            if (today && day === currentDate) {
                dayCell.classList.add('current-day');
            }

            dayContainer.appendChild(dayCell);
        }

        calendar.appendChild(dayContainer);

        // Event listeners para navegação no calendário
        document.getElementById('prev-month').addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar(currentMonth, currentYear);
        });

        document.getElementById('next-month').addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar(currentMonth, currentYear);
        });
    }

    // Renderização inicial do mês atual
    renderCalendar(currentMonth, currentYear);
});
