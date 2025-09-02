
/** All page elements are set up here */
export class pageElements {
    constructor() {
        // PAGE
        this.container = document.querySelector('.container');
        this.sidebar = document.querySelector('.sidebar');
        this.tasksNav = document.querySelector('.tasks-nav');
        this.projectsNav = document.querySelector('.projects-nav');
        this.projNav = document.querySelectorAll('.projects-nav');
        this.mainContent = document.querySelector('.main-content');
        this.header = document.querySelector('.header');
        this.tasksContainer = document.querySelector('.tasks');
        
        // PROJECTS
        this.projectName = document.querySelector('#project-name');
        this.newProjectBtn = document.querySelector('.new-project-btn');
        this.submitProjectBtn = document.querySelector('.submit-project-btn');
        this.projectDialog = document.querySelector('.project-dialog');
        this.closeProjectDialog = document.querySelector('.close-project-dialog');
        
        // TASKS
        this.newTaskBtn = document.querySelector('.new-task-btn');
        this.submitTaskBtn = document.querySelector('.submit-task-btn');
        this.taskDialog = document.querySelector('.task-dialog');
        this.closeTaskDialog = document.querySelector('.close-task-dialog');

        // FORM
        this.titleInput = document.querySelector('#title');
        this.radioLow = document.querySelector('#radio-low');
        this.radioMedium = document.querySelector('#radio-medium');
        this.radioHigh = document.querySelector('#radio-high');
        this.dateInput = document.querySelector('#date');
        this.dropdown = document.querySelector('#projects-dropdown');
        this.notesInput = document.querySelector('#notes');
    }
}