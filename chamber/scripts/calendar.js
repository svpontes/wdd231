const monthYear = document.getElementById('monthYear');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const calendarBody = document.querySelector('#calendar-table tbody');

let currentDate = new Date();

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Atualizar o cabeçalho com o mês e ano
    const options = { month: 'long', year: 'numeric' };
    monthYear.textContent = date.toLocaleDateString('en-US', options);

    // Limpar o calendário existente
    calendarBody.innerHTML = '';

    // Obter o primeiro dia do mês e o número de dias no mês
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const currentDay = today.getDate();

    let row = document.createElement('tr');
    // Preencher os dias em branco até o primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
        let cell = document.createElement('td');
        row.appendChild(cell);
    }

    // Preencher os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement('tr');
        }

        let cell = document.createElement('td');
        cell.textContent = day;

        // Destacar o dia atual
        if (isCurrentMonth && day === currentDay) {
            cell.classList.add('current-day'); // Adiciona uma classe especial para o dia atual
        }

        row.appendChild(cell);
    }

    // Adicionar a última linha ao corpo do calendário
    calendarBody.appendChild(row);
}

// Navegação entre os meses
prevButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// Inicializar o calendário
renderCalendar(currentDate);
