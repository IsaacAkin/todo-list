import './styles.css';
import { projects, Project, createProject, displayTodos, findProjectByName } from './projects';
import { createTask } from './todo';
import { listeners, displayProjects } from './event-listeners';

function userInteraction() {
    let completedTodos = [];

    createProject('All Tasks');
    const allTasks = findProjectByName('All Tasks');
    // const task = createTask('Test', 'Medium', new Date().toLocaleDateString(), 'test test test');
    const task = createTask('Test', 'Medium', '2025-09-03', 'test test test');
    allTasks.addTask(task);
    displayProjects();
    listeners;
}

userInteraction();