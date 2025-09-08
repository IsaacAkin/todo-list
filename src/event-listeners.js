import { projects, createProject, findProjectByName, findProjectById, findTask } from "./projects";
import { createTask } from "./todo";

let currentProject;

// PAGE
const container = document.querySelector('.container');
const sidebar = document.querySelector('.sidebar');
const tasksNav = document.querySelector('.tasks-nav');
const projectsNav = document.querySelector('.projects-nav');
const projNav = document.querySelectorAll('.projects-nav');
const mainContent = document.querySelector('.main-content');
const header = document.querySelector('.header');
const tasksContainer = document.querySelector('.tasks');

// PROJECTS
const projectName = document.querySelector('#project-name');
const newProjectBtn = document.querySelector('.new-project-btn');
const submitProjectBtn = document.querySelector('.submit-project-btn');
const projectDialog = document.querySelector('.project-dialog');
const closeProjectDialog = document.querySelector('.close-project-dialog');

// TASKS
const newTaskBtn = document.querySelector('.new-task-btn');
const submitTaskBtn = document.querySelector('.submit-task-btn');
const submitEditBtn = document.querySelector('.submit-edit-btn');
const taskDialog = document.querySelector('.task-dialog');
const editTaskDialog = document.querySelector('.edit-task-dialog');
const closeTaskDialog = document.querySelector('.close-task-dialog');
const editTask = document.querySelector('.edit-task');
const deleteTask = document.querySelector('.delete-task');
const cards = document.querySelector('.cards');

// NEW TASK FORM
const titleInput = document.querySelector('#title');
const radioLow = document.querySelector('#radio-low');
const radioMedium = document.querySelector('#radio-medium');
const radioHigh = document.querySelector('#radio-high');
const dateInput = document.querySelector('#date');
const notesInput = document.querySelector('#notes');

export const listeners = (() => {

    // TASKS
    newTaskBtn.addEventListener('click', () => {
        taskDialog.showModal();
    });

    submitTaskBtn.addEventListener('click', () => {
        storeTaskInfo();
        displayTasks()
        taskDialog.close();
        resetForm();
    });
    
    submitEditBtn.addEventListener('click', (e) => {
        storeEditInfo(e);
        taskDialog.close();
        resetForm();
    });

    closeTaskDialog.addEventListener('click', () => {
        taskDialog.close();
        resetForm();
    });

    // PROJECTS
    newProjectBtn.addEventListener('click', () => {
        projectDialog.showModal();
    });
    
    submitProjectBtn.addEventListener('click', () => {
        storeProjectInfo(projects);
        projectName.value = '';
        projectDialog.close();
    });

    closeProjectDialog.addEventListener('click', () => {
       projectDialog.close();
       projectName.value = '';
    });

    for (const button of projNav) {
        button.addEventListener('click', (e) => {
            currentProject = e.target.dataset.id;
            displayTasks();
        })
    }

})();

export const displayProjects = () => {    
    projects.forEach((project) => {
        const btn = document.createElement('button');
        btn.dataset.id = project.id;
        btn.textContent = project.projectName;
        projectsNav.appendChild(btn);
    });
}

function storeTaskInfo() {
    const title = titleInput.value;
    const priority = selectPriority();
    const dueDate = dateInput.value;
    const notes = notesInput.value;

    if (title.trim().length === 0 || dueDate.trim().length === 0) {
        return;
    }

    const task = createTask(title, priority, dueDate, notes);
    const project = findProjectById(currentProject);
    const allTasks = findProjectByName('All Tasks');
    if (project === allTasks) {
        allTasks.addTask(task);
    } else {
        project.addTask(task);
        allTasks.addTask(task);
    }
}

function storeProjectInfo() {
    const name = projectName.value;

    if (name.trim().length === 0) {
        return;
    }

    createProject(name);
    projectsNav.textContent = '';
    displayProjects();
}

// TODO: GET THE REMAINING VALUES AND CLEAR THEM
const resetForm = () => {
    titleInput.value = null;
    radioLow.checked = false;
    radioMedium.checked = false;
    radioHigh.checked = false;
    dateInput.value = null;
    notesInput.value = null;
}

const selectPriority = () => {
    if (radioLow.checked === true) {
        return radioLow.value;
    } else if (radioMedium.checked === true) {
        return radioMedium.value;
    } else {
        return radioHigh.value;
    }
}

const showTasks = (task) => {
    let div = document.createElement('div');
    div.classList.add('cards');
    div.dataset.id = task.id;

    let title = document.createElement('p');
    let priority = document.createElement('p');
    let dueDate = document.createElement('p');
    // let notes = document.createElement('p');
    let editBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

    title.textContent = task.title;
    priority.textContent = task.priority;
    dueDate.textContent = task.dueDate;
    // notes.textContent = task.notes;
    editBtn.textContent = 'Edit';
    deleteBtn.textContent = 'Delete';

    editBtn.classList.add('edit-task');
    editBtn.dataset.id = task.id;

    deleteBtn.classList.add('delete-task');
    deleteBtn.dataset.id = task.id;

    div.append(title);
    div.append(priority);
    div.append(dueDate);
    // div.append(notes);
    div.append(editBtn);
    div.append(deleteBtn);

    tasksContainer.appendChild(div);
}

const displayTasks = () => {
    tasksContainer.textContent = '';

    // const item = e.target.dataset.id;
    const project = findProjectById(currentProject);

    project.todos.forEach(task => showTasks(task));
}