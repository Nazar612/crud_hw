const students_table_tBody = document.querySelector("#students_table_tBody");
const get_students_btn = document.querySelector("#get-students-btn");

const add_student_form = document.querySelector("#add-student-form");

const students_table = document.querySelector("#students-table");

const createSt_elements = {
    createNewSt: document.querySelector("#createNewSt"),

    isEnrolled: document.querySelector("#isEnrolled")
}

async function getStudents() {
    try {
        const response = await fetch(`https://6acbba18ef37b15040782799.mockapi.io/students`);
        const data = await response.json()
        renderStudents(data)
        return data
    } catch (error) {
        throw new Error(error.status)
    }
};

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
          <button class="modify_btn" id="${id}">EDIT</button></td>
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
        } 
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

async function deleteStudent(id, student) {
    try {
        const response = await fetch(`https://6acbba18ef37b15040782799.mockapi.io/students/${id}`, {
        method: "DELETE",  
    });

    const data = await response.json() 

    student.remove()
    return data
    } catch (error) {
        throw new Error(error.status)
    }
} 

students_table.addEventListener("click", async (e) => {
    if(!e.target.classList.contains("delete_btn")) {
        return
    }
    e.preventDefault()
    
    stud_id = e.target.id;
    stud_st = e.target.closest(".table_student")
    
    deleteStudent(stud_id, stud_st)
})

// async function putStudent(id) {
    
// }
