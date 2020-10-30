const projectList = document.querySelector('[data-project-list]');
const newProjectForm = document.querySelector('[data-new-project-form');
const newProjectTitleInput = document.querySelector(
  '[data-new-project-title-input]'
);
// const projectSelector = document.querySelector('[data-project-selector]');
const taskListContainer = document.querySelector('[data-task-list-container]');
const taskListProjectTitle = document.querySelector('[data-project-title');
const taskList = document.querySelector('[data-task-list]');
const taskCount = document.querySelector('[data-task-count');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskTitleInput = document.querySelector('[data-new-task-title-input]');
const newTaskDescriptionInput = document.querySelector(
  '[data-new-task-description-input]'
);
const newTaskDateInput = document.querySelector('[data-new-task-date-input]');
const newTaskTimeInput = document.querySelector('[data-new-task-time-input]');
const newTaskPriorityInput = document.querySelector(
  '[data-new-task-priority-input]'
);

const LOCAL_STORAGE_PROJECT_KEY = 'projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'selectedProjectId';

let projects =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY
);

function render() {
  clearElements(projectList);
  renderProjects();
  // Find selected project id
  const selectedProject = projects.find(
    (project) => project.id == selectedProjectId
  );
  console.log(selectedProject);
  // Render project title
  if (selectedProject == null || selectedProject == undefined) {
    taskListContainer.innerHTML = `<h2>No project selected.</h2>`;
  } else {
    taskListProjectTitle.innerText = selectedProject.title;
  }
  // renderTaskCount(selectedProject);
  clearElements(taskList);
  renderTasks(selectedProject);
}

// CLEAR ALL PROJECT & TASK ELEMENTS BEFORE RENDERING
function clearElements(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

// RENDER PROJECTS
function renderProjects() {
  projects.forEach((project) => {
    // Create project list element
    const listElement = document.createElement('li');
    listElement.dataset.projectId = project.id;
    listElement.classList.add('project-list-item');
    listElement.innerText = project.title;
    if (project.id == selectedProjectId) {
      listElement.classList.add('active-project');
    }
    // Create delete project button element
    const buttonElement = document.createElement('button');
    buttonElement.setAttribute('data-project-remove-button', '');
    buttonElement.classList.add('button', 'project-remove-button');
    buttonElement.innerText = 'X';

    // Append created elements
    listElement.appendChild(buttonElement);
    projectList.appendChild(listElement);
  });
}

// RENDER TASKS
function renderTasks(selectedProject) {
  selectedProject.tasks.forEach((task) => {
    // Create task list element
    const listElement = document.createElement('li');
    listElement.dataset.taskId = task.id;
    listElement.classList.add('task-list-item');
    listElement.innerText = task.title;
    // Create details project button element
    const detailsButtonElement = document.createElement('button');
    detailsButtonElement.setAttribute('data-task-details-button', '');
    detailsButtonElement.classList.add('button', 'task-details-button');
    detailsButtonElement.innerText = 'Details';
    // Create remove project button element
    const removeButtonElement = document.createElement('button');
    removeButtonElement.setAttribute('data-task-remove-button', '');
    removeButtonElement.classList.add('button', 'task-remove-button');
    removeButtonElement.innerText = 'X';

    // Append created elements
    listElement.appendChild(removeButtonElement);
    listElement.appendChild(detailsButtonElement);
    taskList.appendChild(listElement);
  });
}

// CREATE PROJECT OBJECT
function createProject(title) {
  return {
    title: title,
    id: new Date().valueOf(),
    tasks: [],
  };
}

// CREATE TASK OBJECT
function createTask(title, description, date, time, priority) {
  return {
    title: title,
    id: new Date().valueOf(),
    description: description,
    date: date,
    time: time,
    priority: priority,
    complete: false,
  };
}

// function renderTaskCount(selectedList) {
//   const incompleteTaskCount = selectedList.tasks.filter(
//     (task) => !task.complete.length
//   );
//   const taskString = incompleteTaskCount === 1 ? 'Task' : 'Tasks';
//   taskCount.innerText = `${incompleteTaskCount} ${taskString} Remaining`;
// }

// CLEAR USER INPUT
function clearUserInput() {
  // Project
  newProjectTitleInput.value = null;
  // Task
  newTaskTitleInput.value = null;
  newTaskDescriptionInput.value = null;
  newTaskDescriptionInput.value = null;
  newTaskDateInput.value = null;
  newTaskPriorityInput.value = null;
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
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
}

function removeTaskLocalStorage(target) {
  const selectedProject = projects.find(
    (project) => project.id == selectedProjectId
  );
  selectedProject.tasks.forEach((task, index) => {
    if (task.id == target.parentElement.dataset.taskId) {
      selectedProject.tasks.splice(index, 1);
    }
  });
  localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
}

// EVENTS
// Create project
newProjectForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = newProjectTitleInput.value;
  if (title === null || title === '') return;
  const project = createProject(title);
  clearUserInput();
  projects.push(project);
  saveProjectLocalStorage();
  render();
});

// Select project
projectList.addEventListener('click', (e) => {
  if (e.target.classList.contains('project-list-item')) {
    selectedProjectId = e.target.dataset.projectId;
    console.log(selectedProjectId);
    saveProjectLocalStorage();
    render();
  }
});

// Remove project
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

// Create task
newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = newTaskTitleInput.value;
  const description = newTaskDescriptionInput.value;
  const date = newTaskDateInput.value;
  const time = newTaskTimeInput.value;
  const priority = newTaskPriorityInput.value;

  if (title === null || title === '') return;
  const task = createTask(title, description, date, time, priority);

  clearUserInput();

  const selectedProject = projects.find(
    (project) => project.id == selectedProjectId
  );
  selectedProject.tasks.push(task);
  saveProjectLocalStorage();
  render();
  // console.log(projects);
});

// Check task (complete)
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('task-list-item')) {
    e.target.classList.toggle('task-complete');
  }
  // if (e.target.classList.contains('task-list-item')) {
  //   selectedProjectId.tasks.
  // }
});

// Remove task
taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('task-remove-button')) {
    e.target.parentElement.remove();
    removeTaskLocalStorage(e.target);
    saveProjectLocalStorage();
    render();
  }
});

document.addEventListener('DOMContentLoaded', render);

console.log(projects);
