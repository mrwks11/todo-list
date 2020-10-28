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
function renderAllProjects() {
  const projects = getProjects();
  projects.forEach((project) => renderProject(project));
}

function createNewProjectHandler(e) {
  e.preventDefault();
  if (projectInputTitle.value === null || projectInputTitle.value === '')
    return;
  const project = createNewProject();
  renderProject(project);
  saveProject(project);
  clearUserInput();
}

function createNewProject() {
  return {
    title: projectInputTitle.value,
    tasks: [],
    // id: Date.now().toString,
  };
}

function renderProject(project) {
  const newProjectListElement = document.createElement('li');
  newProjectListElement.classList.add('project-list-item');
  newProjectListElement.innerText = project.title;
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

// SAVE IN LOCAL STORAGE
function getProjects() {
  let projects;
  if (localStorage.getItem('projects') === null) {
    projects = [];
  } else {
    projects = JSON.parse(localStorage.getItem('projects'));
  }
  return projects;
}

function saveProject(project) {
  const projects = getProjects();
  projects.push(project);
  localStorage.setItem('projects', JSON.stringify(projects));
  console.log(projects);
}

// EVENTS
projectCreateButton.addEventListener('click', createNewProjectHandler);
taskCreateButton.addEventListener('click', createNewTaskHandler);

document.addEventListener('DOMContentLoaded', renderAllProjects());
