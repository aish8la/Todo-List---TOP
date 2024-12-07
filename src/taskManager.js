export class TaskClass {

  #taskID;

  constructor(
    taskID,
    taskName,
    description,
    priority,
    project,
    dueDate,
    subTaskArr = [],
    createdDate,
    completed,
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
    this._createdDate = createdDate || new Date();
    this.completed = completed || false;
  }

  get taskID() {
    return this.#taskID;
  }

  get createdDate() {
    return this._createdDate;
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
    this.subTaskCompleted = completed || false;
  }
}

// dummy dependencies
