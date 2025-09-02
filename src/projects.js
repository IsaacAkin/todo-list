export let projects = [];

export class Project {
    constructor(projectName) {
        if (projectName !== undefined && projectName.trim().length !== 0) {
            this.id = crypto.randomUUID();
            this.projectName = projectName.trim();
            this.todos = [];
            // this.completedTodos = [];
        } else {
            throw new Error("Project must have a name");
        }
    }

    changeProjectName(newProjectName) {
        if (newProjectName !== undefined && newProjectName.trim().length !== 0) {
            this.projectName = newProjectName;
        } else {
            throw new Error("Project must have a name");
        }
    }

    addTask(Todo) {
        this.todos.push(Todo);
    }

    deleteTodo(todoTitle) {
        // finds the projects index in the array and then deletes it
        // const todoToDelete = this.todos.findIndex(todo => todo.id === todoId);
        const todoToDelete = this.todos.findIndex(todo => todo.title === todoTitle);
        this.todos.splice(todoToDelete, 1);
    }

    markAsComplete(todoTitle) {
        /** logic for marking as complete */
        
        const other = this.todos.find(todo => todo.title === todoTitle);
        completedTodos.push(other);
        this.deleteTodo(todoTitle);
    }
}

export function createProject(projectName) {
    const project = new Project(projectName); 
    projects.push(project);
}

// export function displayTodos(database, projectId) {
//     database.find(project => project.id === projectId).displayTodos();
// }

export function findProjectByName(projectName) {
    return projects.find(project => project.projectName === projectName);
}

export function findProjectById(projectId) {
    return projects.find(project => project.id === projectId);
}

export function deleteProject(projectId) {
    // finds the projects index in the array and then deletes it
    const projectToDelete = projects.findIndex(project => project.id === projectId);
    projects.splice(projectToDelete, 1);
}