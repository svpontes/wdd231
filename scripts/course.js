import { courses } from "../data/coursesinfo.js";
console.log(courses)

document.addEventListener("DOMContentLoaded", () => {
    
    updateCourseList(courses);

    let selectingButtons = document.getElementsByClassName("selecting-buttons")[0];

    selectingButtons.addEventListener("click", (event) => {
        let textContent = event.target.innerText;

        if (textContent === "All") {
            updateCourseList(courses);
        } else if (textContent === "WDD") {
            let updatedCourses = courses.filter((course) => course.subject === "WDD");

            console.log(updatedCourses);
            updateCourseList(updatedCourses);
        } else if (textContent === "CSE") {
            let updatedCourses = courses.filter((course) => course.subject === "CSE");

            console.log(updatedCourses);
            updateCourseList(updatedCourses);
        }
    });

    document.getElementById("close-dialog").addEventListener("click", () => {
        document.querySelector("#course-details dialog").close();
    });

    // When clicking on the backdrop of the dialog, close the dialog
    document.querySelector("#course-details dialog").addEventListener("click", (event) => {
        if (event.target === document.querySelector("#course-details dialog")) {
            document.querySelector("#course-details dialog").close();
        }
    });
});


// Fechar o modal ao clicar no botão de fechar
document.getElementById("close-dialog").addEventListener("click", () => {
    document.querySelector("#course-details dialog").close(); // Fecha o modal de detalhes do curso
});

// Fecha o modal ao clicar fora da área de conteúdo do modal
document.querySelector("#course-details dialog").addEventListener("click", (event) => {
    if (event.target === document.querySelector("#course-details dialog")) {
        document.querySelector("#course-details dialog").close(); // Fecha o modal se clicado fora dele
    }
});

function updateCourseList(courses) {
    let courseList = document.getElementById("course-list");
    courseList.innerHTML = "";

    let requiredCredits = document.getElementById("required-credits");
    requiredCredits.innerText = courses.reduce((acc, course) => acc + course.credits, 0);

    courses.forEach(course => {
        let li = document.createElement("li");
        li.textContent = `${course.subject} ${course.number}`;

        if (!course.completed) {
            li.setAttribute("class", "disabled");
        } else {
            li.addEventListener("click", handleCourseClick.bind(null, course));
        }

        courseList.appendChild(li);
    });
}

function handleCourseClick(course) {
    let courseDetailsDialog = document.querySelector("#course-details dialog");

    let courseId = document.getElementById("course-id");
    let courseTitle = document.getElementById("course-title");
    let courseCredits = document.getElementById("course-credits");
    let courseCertificate = document.getElementById("course-certificate");
    let courseDescription = document.getElementById("course-description");
    let courseTechnology = document.getElementById("course-technology");

    courseId.innerText = `${course.subject} ${course.number}`;
    courseTitle.innerText = course.title;
    courseCredits.innerText = `Credits: ${course.credits}`;
    courseCertificate.innerText = `Certificate: ${course.certificate}`;
    courseDescription.innerText = course.description;
    courseTechnology.innerText = `Technologies: ${course.technology.join(", ")}`;

    courseDetailsDialog.showModal();
}