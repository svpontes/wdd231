const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];
const courseList = document.getElementById('course-list');

// Função para renderizar os cursos
function renderCourses(courses) {
    courseList.innerHTML = ''; // Limpa o conteúdo anterior
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        if (course.completed) {
            courseCard.classList.add('completed');
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number} - ${course.title}</h3>
           
        `;

        courseCard.addEventListener('click', ()=>{
            modalTitle.textContent = `${course.subject} ${course.number} - ${course.title}`;
            modalCredits.textContent = `Credits: ${course.credits}`;
            modalCompleted.textContent = `Completed: ${course.completed ? 'Yes' : 'No'}`;
            modal.style.display = 'block'; // Exibe a modal 
        })

        courseList.appendChild(courseCard);
    });
}

// Funções de filtragem
document.getElementById('filter-all').addEventListener('click', () => renderCourses(courses));
document.getElementById('filter-cse').addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    renderCourses(cseCourses);
});
document.getElementById('filter-wdd').addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    renderCourses(wddCourses);
});

// Fechar a modal quando o usuário clicar no "X"
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar a modal quando o usuário clicar fora da modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Renderiza todos os cursos ao carregar a página
renderCourses(courses);