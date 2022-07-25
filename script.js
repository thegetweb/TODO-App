let form = document.getElementById('form');
let textinput = document.getElementById('textinput');
let msg = document.getElementById('msg');
let dateinput = document.getElementById('dateinput');
let textarea = document.getElementById('textarea');
let tasks = document.getElementById('tasks');
let addBtn = document.getElementById('addBtn');



form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formValidation()
});

let formValidation = () => {
    if(textinput.value === ""){
        msg.innerHTML = "Failer to input fild";
    }else{
        msg.innerHTML = "";
        acceptData();
        addBtn.setAttribute('data-bs-dismiss', 'modal');
        addBtn.click();

        (() =>{
            addBtn.setAttribute('data-bs-dismiss', '');
        })()
    }
}

let data = [];


let acceptData = () => {
    data.push({
        text: textinput.value,
        dateinput: dateinput.value,
        textarea: textarea.value,
    });

    localStorage.setItem("data", JSON.stringify(data))
    createTask()
}


let createTask = () =>{
    tasks.innerHTML = "";
    data.map((x,y) =>{
        return tasks.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="text-secondary small">${x.dateinput}</span>
            <p>${x.textarea}</p>

            <span class="option">
                <i data-bs-toggle="modal" data-bs-target="#form" onclick="editTask(this)" class="fas fa-edit"></i>
                <i onclick="removeTask(this)" class="fas fa-trash-alt"></i>
            </span>
        </div>
    `
    })
    
    resetForm() 
}

let resetForm = () =>{
    textinput.value = "";
    dateinput.value = "";
    textarea.value = "";
}


let removeTask = (e) =>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1)
    localStorage.setItem("data", JSON.stringify(data))
}

let editTask = (e) => {
    let selectTask = e.parentElement.parentElement;

    textinput.value = selectTask.children[0].innerHTML;
    dateinput.value = selectTask.children[1].innerHTML;
    textarea.value = selectTask.children[2].innerHTML;

    removeTask(e)
}

(() =>{
    data = JSON.parse(localStorage.getItem('data'));
    console.log(data)
    createTask()
})()