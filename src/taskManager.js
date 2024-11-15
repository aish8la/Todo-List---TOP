export class TaskClass {

  #taskID;
  #taskName;
  #description;
  #priority;
  #project;
  #dueDate;
  #subTaskArr;
  #completed;

  constructor(
    taskID,
    taskName,
    description,
    priority,
    project,
    dueDate,
    subTaskArr = [],
    completed = false,
  ) {
    this.#taskID = taskID;
    this.#taskName = taskName;
    this.#description = description;
    this.#priority = priority;
    this.#project = project;
    this.#dueDate = new Date(dueDate);
    this.#subTaskArr = subTaskArr;
    this.#completed = completed;
  }

  #createdDate = new Date()

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

  get completed() {
    return this.#completed;
  }

  get createdDate() {
    return this.createdDate;
  }
}

export class SubTaskClass {
  #subTaskDescription;
  #subTaskCompleted;

  constructor(
    description,
    completed = false
  ) {
    this.#subTaskDescription = description;
    this.#subTaskCompleted = completed;
  }
}

// dummy dependencies
