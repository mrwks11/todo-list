// SELECTORS
const mainContainer = document.querySelector('.main-container');

const projectInputTitle = document.getElementById('project-title');
const projectCreateButton = document.querySelector('.project-create-button');
const projectListContainer = document.querySelector('.project-list-container');
const projectList = document.querySelector('.project-list');
const projectListItem = document.querySelectorAll('.project-list-item');
const projectRemoveButton = document.querySelectorAll('.project-remove-button');

const taskInputProjectSelector = document.getElementById('project-selector');
const taskInputTitle = document.getElementById('task-title');
const taskInputDescription = document.getElementById('task-description');
const taskInputDueDate = document.getElementById('task-date');
const taskInputTime = document.getElementById('task-time');
const taskInputPriority = document.getElementById('task-priority');
const taskCreateButton = document.querySelector('.task-create-button');
const taskListContainer = document.querySelector('.task-list-container');
const taskList = document.querySelector('.task-list');

// FUNCTIONS
function renderAllSavedProjects() {
  const projects = getProjectsLocalStorage();
  projects.forEach((project) => renderProject(project));
  // console.log(projects);
}

function createNewProjectHandler(e) {
  e.preventDefault();
  if (checkInputTitleEmpty(projectInputTitle.value)) return;
  if (checkInputTitleExists(projectInputTitle.value)) return;
  const project = createNewProject();
  renderProject(project);
  saveProjectLocalStorage(project);
  clearUserInput();
}

function checkInputTitleEmpty(title) {
  if (title === null || title === '') {
    alert('Title cannot be empty, please fill in a project title.');
    return true;
  }
  return false;
}

function checkInputTitleExists(title) {
  const projects = getProjectsLocalStorage();
  projects.forEach((project) => {
    if (title === project.title) {
      alert('Project already exists, please enter a new title.');
      return true;
    }
  });
}

function createNewProject() {
  return {
    title: projectInputTitle.value,
    id: new Date().valueOf(),
    tasks: [],
  };
}

function renderProject(project) {
  const newProjectListElement = document.createElement('li');
  newProjectListElement.classList.add('project-list-item');
  newProjectListElement.innerHTML = `
    ${project.title} <button class="button project-remove-button" data-id="${project.id}">Remove</button>
  `;
  projectList.appendChild(newProjectListElement);
  createProjectSelectorOption(project);
}

function createProjectSelectorOption(project) {
  const newOptionElement = document.createElement('option');
  newOptionElement.classList.add('project-option');
  newOptionElement.setAttribute('data-id', project.id);
  newOptionElement.setAttribute('value', project.title);
  newOptionElement.innerText = project.title;
  taskInputProjectSelector.appendChild(newOptionElement);
}

function removeProjectHandler(target, id) {
  removeProjectUI(target);
  removeProjectLocalStorage(id);
  // removeProjectSelector(id);
}

function removeProjectUI(target) {
  if (target.classList.contains('project-remove-button')) {
    target.parentElement.remove();
  }
}

function createNewTaskHandler(e) {
  e.preventDefault();
  if (taskInputTitle.value == null || taskInputTitle.value === '') return;
  const task = createNewTask();
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

// LOCAL STORAGE
function getProjectsLocalStorage() {
  let projects;
  if (localStorage.getItem('projects') === null) {
    projects = [];
  } else {
    projects = JSON.parse(localStorage.getItem('projects'));
  }
  return projects;
}

function saveProjectLocalStorage(project) {
  const projects = getProjectsLocalStorage();
  projects.push(project);
  localStorage.setItem('projects', JSON.stringify(projects));
}

function removeProjectLocalStorage(id) {
  const projects = getProjectsLocalStorage();
  projects.forEach((project, index) => {
    if (project.id == id) {
      projects.splice(index, 1);
    }
  });
  localStorage.setItem('projects', JSON.stringify(projects));
}

// TOGGLE
// function toggleActiveClass(target) {
//   target.classList.toggle('active');
// }

// EVENTS
projectCreateButton.addEventListener('click', createNewProjectHandler);
taskCreateButton.addEventListener('click', createNewTaskHandler);

projectList.addEventListener('click', (e) => {
  removeProjectHandler(e.target, e.target.dataset.id);
  // toggleActiveClass(e.target);
});

document.addEventListener('DOMContentLoaded', renderAllSavedProjects);
