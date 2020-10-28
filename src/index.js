// SELECTORS
const mainContainer = document.querySelector('.main-container');

const projectInputTitle = document.getElementById('project-title');
const projectCreateButton = document.querySelector('.project-create-button');
const projectListContainer = document.querySelector('.project-list-container');
const projectList = document.querySelector('.project-list');
const projectListItem = document.querySelectorAll('.project-list-item');
const projectRemoveButton = document.querySelectorAll('.remove-btn');

const taskInputProjectSelector = document.getElementById('project-selector');
const taskInputTitle = document.getElementById('task-title');
const taskInputDescription = document.getElementById('task-description');
const taskInputDueDate = document.getElementById('task-date');
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
  if (projectInputTitle.value === null || projectInputTitle.value === '')
    return;
  const project = createNewProject();
  renderProject(project);
  saveProjectLocalStorage(project);
  clearUserInput();
}

function createNewProject() {
  return {
    title: projectInputTitle.value,
    tasks: [],
    id: new Date().valueOf(),
  };
}

function renderProject(project) {
  const newProjectListElement = document.createElement('li');
  newProjectListElement.classList.add('project-list-item');
  newProjectListElement.innerHTML = `
    ${project.title} <button class="btn remove-btn" data-id="${project.id}">Remove</button>
  `;
  projectList.appendChild(newProjectListElement);
  updateProjectSelector(project);
}

function updateProjectSelector(project) {
  const newOptionElement = document.createElement('option');
  newOptionElement.setAttribute('value', project.title);
  newOptionElement.innerText = project.title;
  taskInputProjectSelector.appendChild(newOptionElement);
}

function removeProjectHandler(target, id) {
  removeProjectUI(target);
  removeProjectLocalStorage(id);
}

function removeProjectUI(target) {
  if (target.classList.contains('remove-btn')) {
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

// EVENTS
projectCreateButton.addEventListener('click', createNewProjectHandler);
taskCreateButton.addEventListener('click', createNewTaskHandler);

projectListContainer.addEventListener('click', (e) => {
  removeProjectHandler(e.target, e.target.dataset.id);
});

document.addEventListener('DOMContentLoaded', renderAllSavedProjects);
