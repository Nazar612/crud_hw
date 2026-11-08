// const students = [

//     {

//         "id": 1,

//         "name": "Ivan Petrenko",

//         "age": 15,

//         "course": "Web Development",

//         "skills": ["HTML", "CSS", "JavaScript"],

//         "email": "ivan.petrenko@example.com",

//         "isEnrolled": true

//     },

//     {

//         "id": 2,

//         "name": "Olha Kovalenko",

//         "age": 16,

//         "course": "Game Development",

//         "skills": ["C#", "Unity"],

//         "email": "olha.kovalenko@example.com",

//         "isEnrolled": true

//     },

//     {

//         "id": 3,

//         "name": "Dmytro Shevchenko",

//         "age": 14,

//         "course": "Mobile App Development",

//         "skills": ["Java", "Kotlin", "Android Studio"],

//         "email": "dmytro.shevchenko@example.com",

//         "isEnrolled": false

//     },

//     {

//         "id": 4,

//         "name": "Anastasia Ivanova",

//         "age": 17,

//         "course": "Data Science",

//         "skills": ["Python", "Pandas", "Machine Learning"],

//         "email": "anastasia.ivanova@example.com",

//         "isEnrolled": true

//     },

//     {

//         "id": 5,

//         "name": "Mykola Bondarenko",

//         "age": 15,

//         "course": "Cybersecurity",

//         "skills": ["Networking", "Ethical Hacking", "Linux"],

//         "email": "mykola.bondarenko@example.com",

//         "isEnrolled": true

//     }

// ]

const students_table_tBody = document.querySelector("#students_table_tBody");
const get_students_btn = document.querySelector("#get-students-btn");

const add_student_form = document.querySelector("#add-student-form")

const createSt_elements = {
    createNewSt: document.querySelector("#createNewSt"),

    isEnrolled: document.querySelector("#isEnrolled")
}


function getStudents() {
    return fetch(`https://6acbba18ef37b15040782799.mockapi.io/students`).then((response) => {
        if(!response.ok) {
            throw new Error(response.status)
        };
        return response.json()
    }).then((data) => {
        renderStudents(data)
    })
}
getStudents()
function renderStudents(data) {
    const html =  data.map(({id, name, course, age, skills, email}) => {
        
        return `<tr class="table_student" id="${id}">
          <td class="table_student_info">${id}</td>
          <td class="table_student_info">${name}</td>
          <td class="table_student_info">${age}</td>
          <td class="table_student_info">${course}</td>
          <td class="table_student_info">
          <ul class="table_student_info_list">
          ${skills.map(skill => `
        <li class="table_student_info_list_skill">
          <p class="table_student_info_list_skill_t">${skill}</p>
        </li>`).join(" ")}
        </ul></td>
          <td class="table_student_info">${email}</td>
          <td class="table_student_info"></td>
          <td class="table_student_info"><button class="delete_btn" id="${id}">DELETE</button>
          <button class="modify_btn">EDIT</button></td>
        </tr>`
    }).join(" ")

    students_table_tBody.innerHTML = html
};

get_students_btn.addEventListener("click", (e) => {
})

async function addStudent(data) {
    try {
        const response = await fetch(`https://6acbba18ef37b15040782799.mockapi.io/students`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type":"application/json"
        },
    });

    getStudents()

    return response.json()
    } catch (error) {
        throw new Error(error.status)
    };

}

add_student_form.addEventListener("submit", (e) => {
    const form_data = new FormData(add_student_form)
    const formData_name = form_data.get("name");
    const formData_age = form_data.get("age");
    const formData_course = form_data.get("course");
    const formData_skills = form_data.get("skills");
    const formData_email = form_data.get("email")
   
    const student = {
        name: formData_name,
        age: formData_age,
        skills: formData_skills.split(","),
        course: formData_course,
        email: formData_email,
        id: Math.floor(Math.random() * 1000),
        isEnrolled: true,
    };

    e.preventDefault()

    addStudent(student)
});


