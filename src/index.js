// SELECTORS
const mainContainer = document.querySelector('.main-container');

const projectForm = document.querySelector('.project-form');
const projectInputTitle = document.getElementById('project-title');
const projectCreateButton = document.querySelector('.project-create-button');
const projectListContainer = document.querySelector('.project-list-container');
const projectList = document.querySelector('.project-list');
const projectListItems = document.querySelectorAll('.project-list-item');
const projectRemoveButtons = document.querySelectorAll(
  '.project-remove-button'
);

const taskInputProjectSelector = document.getElementById('project-selector');
const taskInputProjectSelectorOptions = document.querySelectorAll(
  '.project-option'
);
const taskInputTitle = document.getElementById('task-title');
const taskInputDescription = document.getElementById('task-description');
const taskInputDueDate = document.getElementById('task-date');
const taskInputTime = document.getElementById('task-time');
const taskInputPriority = document.getElementById('task-priority');
const taskCreateButton = document.querySelector('.task-create-button');
const taskListContainer = document.querySelector('.task-list-container');
const taskList = document.querySelector('.task-list');

let activeProject;

// INITIAL DOM LOAD
function renderStoredProjects() {
  const projects = getProjectsLocalStorage();
  projects.forEach((project) => renderProject(project));
  console.log(projects);
}

// PROJECTS
function createNewProjectHandler(e) {
  e.preventDefault();
  if (checkInputTitleEmpty(projectInputTitle.value)) return;
  const project = createNewProjectObject();
  saveProjectLocalStorage(project);
  renderProject(project);
  clearUserInput();
}

function checkInputTitleEmpty(title) {
  if (title === null || title === '') {
    alert('Title cannot be empty, please fill in a project title.');
    return true;
  }
  return false;
}

function createNewProjectObject() {
  return {
    title: projectInputTitle.value,
    id: new Date().valueOf(),
    tasks: [],
  };
}

function renderProject(project) {
  createProjectListItems(project);
  createProjectSelectorOption(project);
}

function createProjectListItems(project) {
  const newProjectListItem = document.createElement('li');
  newProjectListItem.classList.add('project-list-item');
  newProjectListItem.setAttribute('data-id', `${project.id}`);
  newProjectListItem.innerHTML = `
    ${project.title} <button class="button project-remove-button" data-id="${project.id}">Remove</button>
  `;
  projectList.appendChild(newProjectListItem);
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
  removeProjectDOM(target);
  removeProjectSelectorOption(target, id);
  removeProjectLocalStorage(id);
}

function removeProjectDOM(target) {
  if (target.classList.contains('project-remove-button')) {
    target.parentElement.remove();
  }
}

function removeProjectSelectorOption(target, id) {
  const projectSelectorOptions = document.querySelectorAll('.project-option');
  projectSelectorOptions.forEach((option, index) => {
    if (
      option.dataset.id == id &&
      target.classList.contains('project-remove-button')
    ) {
      taskInputProjectSelector.remove(index, 1);
    }
  });
}

function updateActiveProjectHandler(target) {
  setCurrentProject(target);
  updateActiveProjectClass();
  updateActiveProjectSelector();
}

function setCurrentProject(target) {
  if (target.classList.contains('project-list-item')) {
    activeProject = target.dataset.id;
    console.log(activeProject);
  }
}

function updateActiveProjectClass() {
  const projectListItems = document.querySelectorAll('.project-list-item');
  projectListItems.forEach((item) => {
    if (item.classList.contains('project-list-item')) {
      item.classList.remove('active');
    }
    if (item.dataset.id == activeProject) {
      item.classList.add('active');
    }
  });
}

function updateActiveProjectSelector() {
  const taskInputProjectSelectorOptions = document.querySelectorAll(
    '.project-option'
  );
  taskInputProjectSelectorOptions.forEach((option) => {
    option.removeAttribute('selected');
    if (option.dataset.id == activeProject) {
      option.setAttribute('selected', 'selected');
    }
  });
}

// TASKS
function createNewTaskHandler(e) {
  e.preventDefault();
  if (taskInputTitle.value == null || taskInputTitle.value === '') return;
  const task = createNewTaskObject();
  // console.log(task);
  saveTaskLocalStorage(task);
  renderTask(task);
  clearUserInput();
}

function createNewTaskObject() {
  return {
    project: taskInputProjectSelector.value,
    title: taskInputTitle.value,
    description: taskInputDescription.value,
    date: taskInputDueDate.value,
    priority: taskInputPriority.value,
    id: new Date().valueOf(),
  };
}

function renderTask(task) {
  const newTaskListElement = document.createElement('li');
  newTaskListElement.classList.add('task-list-item');
  newTaskListElement.innerText = task.title;
  taskList.appendChild(newTaskListElement);
}

// CLEAR USER INPUT
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

// function saveTaskLocalStorage(task) {
//   const projects = getProjectsLocalStorage();
//   projects.forEach((project) => {
//     if (project.title == task.project) {
//       projects.push(task);
//     }
//   });
// }

// EVENTS
projectForm.addEventListener('submit', createNewProjectHandler);
projectList.addEventListener('click', (e) => {
  removeProjectHandler(e.target, e.target.dataset.id);
});
projectList.addEventListener('click', (e) => {
  updateActiveProjectHandler(e.target);
});

taskCreateButton.addEventListener('click', createNewTaskHandler);

document.addEventListener('DOMContentLoaded', renderStoredProjects);
