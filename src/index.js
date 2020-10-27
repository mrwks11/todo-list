// LOCAL STORAGE
let projects = [];
let tasks = [];

// SELECTORS
// Projects
const projectInputTitle = document.getElementById('project-title');
const projectCreateButton = document.querySelector('.project-create-button');
const projectListContainer = document.querySelector('.project-list-container');

//Tasks
const taskInputTitle = document.getElementById('task-title');
const taskInputDescription = document.getElementById('task-description');
const taskInputDueDate = document.getElementById('task-date');
const taskInputPriority = document.getElementById('task-priority');
const taskCreateButton = document.querySelector('.task-create-button');
const taskListContainer = document.querySelector('.task-list-container');

// EVENT LISTENERS
// Projects
projectCreateButton.addEventListener('click', addNewProject);

// Tasks
taskCreateButton.addEventListener('click', addNewTask);

// FUNCTIONS
// Add New Project
function addNewProject(e) {
  // Prevent Form Submit
  e.preventDefault();
  // Check User Input
  if (projectInputTitle.value == null || projectInputTitle.value === '') return;
  const newProject = createNewProject();
  // Add To Project List
  projects.push(newProject);
  saveNewProject();
  renderNewProject();
  resetUserInput();
}

// Add New Task
function addNewTask(e) {
  // Prevent Form Submit
  e.preventDefault();
  // Check User Input
  if (taskInputTitle.value == null || taskInputTitle.value === '') return;
  const newTask = createNewTask();
  // Add To Task List
  tasks.push(newTask);
  saveNewTask();
  renderNewTask();
  resetUserInput();
}

// Save New Project in Local Storage

// Save New Task in Local Storage

// Render New Project in DOM
function renderNewProject() {
  const newProject = document.createElement('ul');
  newProject.classList.add('project-list-item');
  const newProjectTitle = document.createElement('li');
  newProjectTitle.innerText = projectInputTitle.value;
  // Append New Project
  newProject.appendChild(newProjectTitle);
  projectListContainer.appendChild(newProject);
}

// Render New Task in DOM
function renderNewTask() {
  const newTask = document.createElement('ul');
  newTask.classList.add('task-list-item');
  const newTaskTitle = document.createElement('li');
  newTaskTitle.innerText = taskInputTitle.value;
  // const newTaskDescription = document.createElement('li');
  // newTaskDescription.innerText = taskInputDescription.value;
  // const newTaskDueDate = document.createElement('li');
  // newTaskDueDate.innerText = taskInputDueDate.value;
  // const newTaskPriority = document.createElement('li');
  // newTaskPriority.innerText = taskInputPriority.value;
  // Append New Task
  newTask.appendChild(newTaskTitle);
  // newTask.appendChild(newTaskDescription);
  // newTask.appendChild(newTaskDueDate);
  // newTask.appendChild(newTaskPriority);
  taskListContainer.appendChild(newTask);
}

// Reset User Input
function resetUserInput() {
  // Project
  projectInputTitle.value = null;
  // Task
  taskInputTitle.value = null;
  taskInputDescription.value = null;
  taskInputDueDate.value = null;
  taskInputPriority.value = null;
}

// Create New Project
function createNewProject() {
  return {
    title: projectInputTitle.value,
    // id: Date.now().toString,
  };
}

// Create New Task
function createNewTask() {
  return {
    title: taskInputTitle.value,
    description: taskInputDescription.value,
    date: taskInputDueDate.value,
    priority: taskInputPriority.value,
    // id: Date.now().toString,
  };
}
