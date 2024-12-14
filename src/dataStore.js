export class DataStoreClass {
  constructor(taskClass, subTaskClass) {
    this.taskClass = taskClass;
    this.subTaskClass = subTaskClass;
  }

  #taskArray = [];
  #projectListArr = ["Personal", "Work"];

  #lastID = 0;

  #idGen() {
    return `task-id-${++this.#lastID}`;
  }

  #createSubTask(subTaskDataArr) {
    const newArr = [];
    subTaskDataArr.forEach((element) => {
      const newSubTask = new this.subTaskClass(
        element.subTaskDescription,
        element.subTaskCompleted
      );
      newArr.push(newSubTask);
    });
    return newArr;
  }

  createTask(dataObject) {
    const data = {
      taskID: this.#idGen(),
      taskName: dataObject.taskName || "",
      description: dataObject.description || "",
      priority: dataObject.priority || "Low",
      project: dataObject.project || "Personal",
      dueDate: dataObject.dueDate || "",
      subTaskArr: dataObject.subTaskArr || "",
      createdDate: dataObject.createdDate || "",
      completed: dataObject.completed || false,
    };
    
    const task = new this.taskClass(
      data.taskID,
      data.taskName,
      data.description,
      data.priority,
      data.project,
      data.dueDate,
      this.#createSubTask(data.subTaskArr),
      data.createdDate,
      data.completed,
    );
    this.#taskArray.push(task);
    this.saveToStorage();
  }

  modfiyTask(dataObj) {
    const data = dataObj;
    const taskElementID = this.#taskArray.findIndex((element) => {
      return element.taskID === data.taskID;
    });

    const taskObj = this.#taskArray[taskElementID];

    for (let key in taskObj) {
      //skips the code if the current key is "completed"
      if (key === "completed") {
        continue;
      }
      // Leaves as with an empty string if the key is not defined in the new data
      if (data[key] === undefined) {
        taskObj[key] = "";
      } else {
        // if current key is dueDate then handles empty strings
        if (key === "dueDate") {
          taskObj[key] = data.dueDate === "" ? "" : new Date(data.dueDate);
        }
        taskObj[key] = data[key];
      }
    }
    this.saveToStorage();
  }

  taskCompleteToggle(taskID) {
    const taskIndex = this.#taskArray.findIndex((e) => {
      return taskID === e.taskID;
    });
    this.#taskArray[taskIndex].toggleComplete();
    this.saveToStorage();
  }

  deleteTask(taskID) {
    const taskIndex = this.#taskArray.findIndex((e) => {
      return taskID === e.taskID;
    });

    if (taskIndex === -1) {
      return console.log("The task you are trying to delete does not exist"); //TODO: Add error handling
    }

    this.#taskArray.splice(taskIndex, 1);
    this.saveToStorage();
  }

  addProject(prjName) {
    if (
      this.#projectListArr.some((str) => {
        return str.toLowerCase() === prjName.toLowerCase();
      })
    ) {
      return console.log("Project with that name already exists"); //TODO: Add propper error handling
    }

    this.#projectListArr.push(prjName);
    this.saveToStorage();
  }

  deleteProject(prjName) {
    if (
      this.#taskArray.some((task) => {
        return task.project.toLowerCase() === prjName.toLowerCase();
      })
    ) {
      return console.log("The project you are trying to delete contains tasks"); //TODO: Add a error handler for this
    }

    const indexProject = this.#projectListArr.findIndex((project) => {
      return project.toLowerCase() === prjName.toLowerCase();
    });

    if (indexProject === -1) {
      return console.log("The project you are trying to delete does not exist"); //TODO: Add error handlings
    }

    this.#projectListArr.splice(indexProject, 1);
    this.saveToStorage();
  }

  get taskArr() {
    return this.#taskArray;
  }

  get projectArr() {
    return this.#projectListArr;
  }

  importTasks(tasksArr) {
    tasksArr.forEach(element => {
      
      if(!this.#projectListArr.some(str => {
        return str.toLocaleLowerCase() === element.project.toLocaleLowerCase();
      }) && element.project !== "") {
        this.#projectListArr.push(element.project);
      }

      this.createTask(element);
    });
    this.saveToStorage();

  }

  saveToStorage() {
    const dataObj = {
      tasks: this.#taskArray,
      projects: this.#projectListArr,
    }
    localStorage.setItem("todoLocalData", JSON.stringify(dataObj));
  }

  loadFromStorage() {
      const dataObj = JSON.parse(localStorage.getItem("todoLocalData"));
      this.importTasks(dataObj.tasks);
  }

  loadInitialData(defaultData) {

    if(localStorage.getItem("todoLocalData")) {
      this.loadFromStorage();
    } else {
      this.importTasks(defaultData);
    }
  }

  initializeData(initialData) {
    this.loadInitialData(initialData);
  }
}
