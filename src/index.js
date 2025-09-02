import './styles.css';
import { projects, Project, createProject, displayTodos } from './projects';
import { Todo, createTask } from './todo';
import { listeners, displayProjects } from './event-listeners';
import { pageElements } from "./page-elements";

function userInteraction() {
    const el = new pageElements();
    let completedTodos = [];

    createProject('All Projects');
    displayProjects();
    listeners;
}

userInteraction();