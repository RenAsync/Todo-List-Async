const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
const dataInput = document.getElementById('dataTask');
const dataDate = document.getElementById('dataDate');
const addBtn = document.querySelector('.add-btn');
const container = document.querySelector('.container');
const updateEl = document.createElement('button');

updateEl.setAttribute('class', 'update-button');
updateEl.innerText = 'Update';
container.appendChild(updateEl);
updateEl.style.display = "none";

addBtn.addEventListener('click', () => {
  if (dataInput.value.trim() === '') {
    return;
  }
  if (dataDate.value.trim() === '') {
    return;
  }
  addTask();
});

const divContainer = document.querySelector('.taskList');
divContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('task')) {
      event.target.classList.toggle('completed');
  }
});

function addTask() {
  todoList.push({
    task: dataInput.value,
    date: dataDate.value,
    completed: false 
  });
  localStorage.setItem('todoList', JSON.stringify(todoList));
  console.log(todoList);
  dataInput.value = '';
  dataDate.value = '';

  renderObject();
}

function renderObject() {
  divContainer.innerHTML = '';
  todoList.forEach((element, index) => {
    const { task, date, completed } = element;
    let taskEl = document.createElement('div');
    taskEl.innerText = task;
    taskEl.setAttribute('class', 'task');
    
    let dateEl = document.createElement('div');
    dateEl.innerText = date;
    dateEl.setAttribute('class', 'date');
    
    taskEl.addEventListener('click', () => {
      element.completed = !element.completed;
      renderObject();
    });
    if (completed) {
      taskEl.style.textDecoration = 'line-through';
      dateEl.style.textDecoration = 'line-through';
      taskEl.style.opacity = "40%";
      dateEl.style.opacity = "40%";
    }
  
    let btnField = document.createElement('div');
    btnField.setAttribute('class', 'btn-field');
    let editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.setAttribute('class', 'edit-button');
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Del';
    deleteBtn.setAttribute('class', 'delete-button');
    btnField.appendChild(editBtn);
    btnField.appendChild(deleteBtn);
    divContainer.appendChild(taskEl);
    divContainer.appendChild(dateEl);
    divContainer.appendChild(btnField);

    deleteButton(deleteBtn, index);
    editButton(editBtn, index);
  });
}

function deleteButton(deleteBtn, index) {
  deleteBtn.addEventListener('click', () => {
    const confirmed = confirm('Are you sure to delete this?');
    if(confirmed){
    updateEl.style.display = "none";
    addBtn.style.display = "block";
    todoList.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    dataInput.value = '';
    dataDate.value = '';
    renderObject();
    }
    return
  });
}
    

updateEl.addEventListener("click", () => {
  const index = parseInt(updateEl.getAttribute('data-index'));
  todoList[index].task = dataInput.value;
  todoList[index].date = dataDate.value;
  localStorage.setItem('todoList', JSON.stringify(todoList));
  dataInput.value = '';
  dataDate.value = '';
  updateEl.style.display = "none";
  addBtn.style.display = "block";
  renderObject();
});

function editButton(editBtn, index) {
  editBtn.addEventListener('click', () => {
    updateEl.style.display = "block";
    addBtn.style.display = "none";
    dataInput.value = todoList[index].task;
    dataDate.value = todoList[index].date;

    updateEl.setAttribute('data-index', index);
    dataInput.focus();
  });
}

renderObject();



