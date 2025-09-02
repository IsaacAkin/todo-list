import { projects, createProject, findProjectByName, findProjectById } from "./projects";
import { pageElements } from "./page-elements";
import { createTask } from "./todo";

const el = new pageElements();

export const listeners = (() => {

    // TASKS
    el.newTaskBtn.addEventListener('click', () => {
        el.taskDialog.showModal();
    });

    el.submitTaskBtn.addEventListener('click', () => {
        storeTaskInfo();
        el.taskDialog.close();
        resetForm();
    });

    el.closeTaskDialog.addEventListener('click', () => {
        el.taskDialog.close();
        resetForm();
    });

    // PROJECTS
    el.newProjectBtn.addEventListener('click', () => {
        el.projectDialog.showModal();
    });
    
    el.submitProjectBtn.addEventListener('click', () => {
        storeProjectInfo(projects);
        el.projectName.value = '';
        el.projectDialog.close();
    });

    el.closeProjectDialog.addEventListener('click', () => {
       el.projectDialog.close();
       el.projectName.value = '';
    });

    for (const button of el.projNav) {
        button.addEventListener('click', (e) => {
            displayTasks(e);
        })
    }

})();

export const displayProjects = () => {
    const newOption = document.createElement('option');
    
    projects.forEach((project) => {
        const btn = document.createElement('button');
        btn.dataset.id = project.id;
        btn.textContent = project.projectName;
        el.projectsNav.appendChild(btn);

        newOption.value = project.projectName;
        newOption.text = project.projectName;
        newOption.dataset.id = project.id;
    });

    el.dropdown.add(newOption);
}

function storeTaskInfo() {
    const title = el.titleInput.value;
    const priority = selectPriority();
    const dueDate = el.dateInput.value;
    const selectedProject = el.dropdown.options[el.dropdown.selectedIndex].dataset.id;
    const notes = el.notesInput.value;

    if (title.trim().length === 0 || dueDate.trim().length === 0) {
        return;
    }

    const task = createTask(title, priority, dueDate, notes);
    const project = findProjectById(selectedProject);
    const allProjects = findProjectByName('All Projects');
    if (project === allProjects) {
        allProjects.addTask(task);
    } else {
        project.addTask(task);
        allProjects.addTask(task);
    }
}

function storeProjectInfo() {
    const projectName = el.projectName.value;

    if (projectName.trim().length === 0) {
        return;
    }

    createProject(projectName);
    el.projectsNav.textContent = '';
    displayProjects();
}

// TODO: GET THE REMAINING VALUES AND CLEAR THEM
const resetForm = () => {
    el.titleInput.value = null;
    el.radioLow.checked = false;
    el.radioMedium.checked = false;
    el.radioHigh.checked = false;
    el.dateInput.value = null;
    el.dropdown.value = 'All Projects';
    el.notesInput.value = null;
}

const selectPriority = () => {
    if (el.radioLow.checked === true) {
        return el.radioLow.value;
    } else if (el.radioMedium.checked === true) {
        return el.radioMedium.value;
    } else {
        return el.radioHigh.value;
    }
}

const showTasks = (task) => {
    let div = document.createElement('div');
    div.classList.add('cards');
    div.dataset.id = task.id;

    let title = document.createElement('p');
    let priority = document.createElement('p');
    let dueDate = document.createElement('p');
    let notes = document.createElement('p');

    title.textContent = task.title;
    priority.textContent = task.priority;
    dueDate.textContent = task.dueDate;
    notes.textContent = task.notes;

    div.append(title);
    div.append(priority);
    div.append(dueDate);
    div.append(notes);

    el.tasksContainer.appendChild(div);
}

const displayTasks = (e) => {
    el.tasksContainer.textContent = '';

    const item = e.target.dataset.id;
    const project = findProjectById(item);

    project.todos.forEach(task => showTasks(task));
}