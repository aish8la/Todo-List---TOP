export class taskConstructorClass {
    constructor(taskID, taskName, description, priority, project, dueDate, subtaskObj, completed) {
        this.#taskID = taskID;
        this.#taskName = taskName;
        this.#description = description;
        this.#priority = priority;
        this.#project = project;
        this.#dueDate = dueDate;
        this.#subtaskObj = subtaskObj;
        this.#completed = completed;
    }

    #taskID;
    #taskName;
    #description;
    #priority;
    #project;
    #dueDate;
    #subtaskObj;
    #completed;

    
set taskName(name) {
    this.#taskName = name;
}

set description(description) {
    this.#description = description;
}

set priority(priority) {
    this.#priority = priority;
}

set project(project) {
    this.#project = project;
}

set dueDate(dueDate) {
    this.#dueDate = dueDate;
}

// Implement subtask feature here !!!

set completed(completeStatus) {
        if(typeof(completeStatus) === 'boolean') {
            this.#completed = completeStatus;
        };
    }
}

// dummy dependencies

