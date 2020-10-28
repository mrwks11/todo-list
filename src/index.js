// SELECTORS
const projectInputTitle = document.getElementById('project-title');
const projectCreateButton = document.querySelector('.project-create-button');
const projectListContainer = document.querySelector('.project-list-container');
const projectList = document.querySelector('.project-list');

const taskInputTitle = document.getElementById('task-title');
const taskInputDescription = document.getElementById('task-description');
const taskInputDueDate = document.getElementById('task-date');
const taskInputPriority = document.getElementById('task-priority');
const taskCreateButton = document.querySelector('.task-create-button');
const taskListContainer = document.querySelector('.task-list-container');
const taskList = document.querySelector('.task-list');

// FUNCTIONS
function createNewProjectHandler(e) {
  e.preventDefault();
  if (projectInputTitle.value === null || projectInputTitle.value === '')
    return;
  const newProject = createNewProject();
  renderNewProject();
  clearUserInput();
}

function createNewProject() {
  return {
    title: projectInputTitle.value,
    tasks: [],
    // id: Date.now().toString,
  };
}

function renderNewProject() {
  const newProjectListElement = document.createElement('li');
  newProjectListElement.classList.add('project-list-item');
  newProjectListElement.innerText = projectInputTitle.value;
  projectList.appendChild(newProjectListElement);
}

function createNewTaskHandler(e) {
  e.preventDefault();
  if (taskInputTitle.value == null || taskInputTitle.value === '') return;
  const newTask = createNewTask();
  renderNewTask();
  clearUserInput();
}

function createNewTask() {
  return {
    title: taskInputTitle.value,
    description: taskInputDescription.value,
    date: taskInputDueDate.value,
    priority: taskInputPriority.value,
    // id: Date.now().toString,
  };
}

function renderNewTask() {
  const newTaskListElement = document.createElement('li');
  newTaskListElement.classList.add('task-list-item');
  newTaskListElement.innerText = taskInputTitle.value;
  taskList.appendChild(newTaskListElement);
}

function clearUserInput() {
  projectInputTitle.value = null;
  taskInputTitle.value = null;
  taskInputDescription.value = null;
  taskInputDueDate.value = null;
  taskInputPriority.value = null;
}

// EVENTS
projectCreateButton.addEventListener('click', createNewProjectHandler);
taskCreateButton.addEventListener('click', createNewTaskHandler);
