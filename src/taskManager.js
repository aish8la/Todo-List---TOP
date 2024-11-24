export class TaskClass {

  #taskID;
  completed = false;

  constructor(
    taskID,
    taskName,
    description,
    priority,
    project,
    dueDate,
    subTaskArr = [],
  ) {
    this.#taskID = taskID;
    this.taskName = taskName;
    this.description = description;
    this.priority = priority;
    this.project = project;

    if (dueDate === "") {
      this.dueDate = "";
    } else {
      this.dueDate = new Date(dueDate);
    }

    this.subTaskArr = subTaskArr;
  }

  #createdDate = new Date()

  get taskID() {
    return this.#taskID;
  }

  get createdDate() {
    return this.#createdDate;
  }

  toggleComplete() {
    this.completed = this.completed ? false : true;
  }
}

export class SubTaskClass {
  constructor(
    description,
    completed = false
  ) {
    this.subTaskDescription = description;
    this.subTaskCompleted = completed;
  }
}

// dummy dependencies
