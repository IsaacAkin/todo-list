export class Todo {
    constructor(title, priority, dueDate, notes) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.notes = notes;
    }

    editTodo(newTitle, newPriority, newDueDate, newNotes) {
        this.title = newTitle;
        this.priority = newPriority;
        this.dueDate = newDueDate;
        this.notes = newNotes;
    }
}

export function createTask(title, priority, dueDate, notes) {
    return new Todo(title, priority, dueDate, notes);
}