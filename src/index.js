// SELECTORS
// Projects
const projectList = document.querySelector('[data-project-list]');
const newProjectForm = document.querySelector('[data-new-project-form');
const newProjectTitleInput = document.querySelector(
  '[data-new-project-title-input]'
);
// Tasks
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
const clearCompletedTasks = document.querySelector(
  '[data-clear-completed-tasks]'
);
// Modal
const taskModal = document.querySelector('[data-task-modal]');
const taskModalContent = document.querySelector('[data-task-modal-content]');
const editTaskLegend = document.querySelector('[data-edit-task-legend]');
const editTaskForm = document.querySelector('[data-edit-task-form]');
const editTaskTitleInput = document.querySelector(
  '[data-edit-task-title-input]'
);
const editTaskDescriptionInput = document.querySelector(
  '[data-edit-task-description-input]'
);
const editTaskDateInput = document.querySelector('[data-edit-task-date-input]');
const editTaskTimeInput = document.querySelector('[data-edit-task-time-input]');
const editTaskPriorityInput = document.querySelector(
  '[data-edit-task-priority-input]'
);
// const confirmModal = document.querySelector('[data-confirm-modal]');
// const confirmDelete = document.querySelector('[data-confirm-delete]');
// const cancelDelete = document.querySelector('[data-confirm-delete]');

// Create variable and assing value to avoid overriding
const LOCAL_STORAGE_PROJECT_KEY = 'projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'selectedProjectId';

// GET SAVED PROJECTS FRONM LOCAL STORAGE
let projects =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(
  LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY
);

// RENDER ALL ELEMENTS
function render() {
  clearElements(projectList);
  renderProjects();
  // Find selected project id
  const selectedProject = projects.find(
    (project) => project.id == selectedProjectId
  );
  // Render project title
  if (selectedProject == null || selectedProject == undefined) {
    taskListProjectTitle.innerText = `No project selected.`;
  } else {
    taskListProjectTitle.innerText = `${selectedProject.title}`;
  }
  clearElements(taskList);
  renderTasks(selectedProject);
  renderTaskCount(selectedProject);
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
    const listElement = document.createElement('div');
    listElement.dataset.projectId = project.id;
    listElement.classList.add('project-list-item');
    listElement.innerText = `- ${project.title}`;
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
    const listElement = document.createElement('div');
    listElement.dataset.taskId = task.id;
    listElement.classList.add('task-list-item');
    listElement.innerText = `- ${task.title}`;
    if (task.complete) {
      listElement.classList.add('task-complete');
    }
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

// RENDER TASK COUNT
function renderTaskCount(selectedProject) {
  const incompleteTaskCount = selectedProject.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount == 1 ? 'Task' : 'Tasks';
  taskCount.innerText = `${incompleteTaskCount} ${taskString} Remaining`;
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

// CLEAR USER INPUT
function clearUserInput() {
  // Project
  newProjectTitleInput.value = null;
  // Task
  newTaskTitleInput.value = null;
  newTaskDescriptionInput.value = null;
  newTaskDescriptionInput.value = null;
  newTaskDateInput.value = null;
  // newTaskPriorityInput.value = null;
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
});

// Check task (complete)
taskList.addEventListener('click', (e) => {
  const selectedProject = projects.find(
    (project) => project.id == selectedProjectId
  );
  selectedProject.tasks.forEach((task, index) => {
    if (task.id == e.target.dataset.taskId) {
      if (selectedProject.tasks[index].complete === false) {
        e.target.classList.add('task-complete');
        selectedProject.tasks[index].complete = true;
      } else {
        e.target.classList.remove('task-complete');
        selectedProject.tasks[index].complete = false;
      }
    }
  });
  saveProjectLocalStorage();
  render();
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

// Clear completed tasks
clearCompletedTasks.addEventListener('click', (e) => {
  const selectedProject = projects.find(
    (project) => project.id == selectedProjectId
  );
  selectedProject.tasks = selectedProject.tasks.filter(
    (task) => !task.complete
  );
  saveProjectLocalStorage();
  render();
});

// Open task modal
taskList.addEventListener('click', (e) => {
  const selectedProject = projects.find(
    (project) => project.id == selectedProjectId
  );
  if (e.target.classList.contains('task-details-button')) {
    taskModal.style.display = 'block';
    selectedProject.tasks.forEach((task, index) => {
      if (task.id == e.target.parentElement.dataset.taskId) {
        editTaskLegend.innerText = `Edit Task (ID: ${task.id})`;
        editTaskLegend.setAttribute('data-task-id', `${task.id}`);
        editTaskTitleInput.value = selectedProject.tasks[index].title;
        editTaskDescriptionInput.value =
          selectedProject.tasks[index].description;
        editTaskDateInput.value = selectedProject.tasks[index].date;
        editTaskTimeInput.value = selectedProject.tasks[index].time;
        editTaskPriorityInput.value = selectedProject.tasks[index].priority;
      }
    });
  }
});

// Edit task
editTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = editTaskTitleInput.value;
  const description = editTaskDescriptionInput.value;
  const date = editTaskDateInput.value;
  const time = editTaskTimeInput.value;
  const priority = editTaskPriorityInput.value;

  if (title === null || title === '') return;

  const selectedProject = projects.find(
    (project) => project.id == selectedProjectId
  );

  selectedProject.tasks.forEach((task, index) => {
    if (task.id == editTaskLegend.dataset.taskId) {
      selectedProject.tasks[index].title = title;
      selectedProject.tasks[index].description = description;
      selectedProject.tasks[index].date = date;
      selectedProject.tasks[index].time = time;
      selectedProject.tasks[index].priority = priority;
    }
  });
  taskModal.style.display = 'none';
  saveProjectLocalStorage();
  render();
});

// Cancel edit task
editTaskForm.addEventListener('click', (e) => {
  if (e.target.classList.contains('task-cancel-button')) {
    taskModal.style.display = 'none';
  }
});

document.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('task-modal') ||
    e.target.classList.contains('task-modal-content')
  ) {
    taskModal.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', render);
