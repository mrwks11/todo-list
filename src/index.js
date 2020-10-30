const projectList = document.querySelector('[data-project-list]');
const newProjectForm = document.querySelector('[data-new-project-form');
const newProjectInput = document.querySelector('[data-new-project-input');
const taskListContainer = document.querySelector('[data-task-list-container]');
const taskListProjectTitle = document.querySelector('[data-project-title');
const taskList = document.querySelector('[data-task-list]');

const LOCAL_STORAGE_PROJECT_KEY = 'projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'selectedProjectId';

let projects =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY
);

function createProject(projectTitle) {
  return {
    title: projectTitle,
    id: new Date().valueOf(),
    tasks: [],
  };
}

function render() {
  clearProjectList(projectList);
  renderProjects();

  const selectedProject = projects.find(
    (project) => project.id == selectedProjectId
  );

  if (selectedProjectId === null) {
    taskListContainer.innerHTML = `<h2>Nothing to display, because no project is selected.</h2>`;
  } else {
    taskListContainer.style.display = '';
    taskListProjectTitle.innerText = selectedProject.title;
  }
}

function clearProjectList(projectList) {
  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }
}

function renderProjects() {
  projects.forEach((project) => {
    const listElement = document.createElement('li');
    listElement.dataset.projectId = project.id;
    listElement.classList.add('project-list-item');
    listElement.innerText = project.title;
    if (project.id == selectedProjectId) {
      listElement.classList.add('active-project');
    }
    const button = document.createElement('button');
    button.setAttribute('data-project-remove-button', '');
    button.classList.add('button', 'project-remove-button');
    button.innerText = 'X';
    listElement.appendChild(button);
    projectList.appendChild(listElement);
  });
}

// LOCAL STORAGE
function saveProjectLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
  localStorage.setItem(
    LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY,
    selectedProjectId
  );
}

function removeProjectLocalStorage(target) {
  projects.forEach((project, index) => {
    if (project.id == target.parentElement.dataset.projectId) {
      projects.splice(index, 1);
    }
  });
  localStorage.setItem('projects', JSON.stringify(projects));
}

// EVENTS
newProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const projectTitle = newProjectInput.value;
  if (projectTitle === null || projectTitle === '') return;
  const project = createProject(projectTitle);
  newProjectInput.value = null;
  projects.push(project);
  saveProjectLocalStorage();
  render();
});

projectList.addEventListener('click', (e) => {
  if (e.target.classList.contains('project-list-item')) {
    selectedProjectId = e.target.dataset.projectId;
    saveProjectLocalStorage();
    render();
  }
});

projectList.addEventListener('click', (e) => {
  if (e.target.classList.contains('project-remove-button')) {
    projects.filter((project) => {
      if (project.id !== selectedProjectId) {
        selectedProjectId = null;
      }
    });
    e.target.parentElement.remove();
    removeProjectLocalStorage(e.target);
    saveProjectLocalStorage();
    render();
  }
});

document.addEventListener('DOMContentLoaded', render);
