export class TaskClass {
  constructor(
    taskID,
    taskName,
    description,
    priority,
    project,
    dueDate,
    subtaskObj,
    completed
  ) {
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
    if (typeof completeStatus === "boolean") {
      this.#completed = completeStatus;
    }
  }

  get taskName() {
    return this.#taskName;
  }

  get description() {
    return this.#description;
  }

  get priority() {
    return this.#priority;
  }

  get project() {
    return this.#project;
  }

  get dueDate() {
    return this.#dueDate;
  }

  // Implement a getter that creates a copy of the subtask object here !!!

  get completed() {
    return this.#completed;
  }
}

// dummy dependencies
