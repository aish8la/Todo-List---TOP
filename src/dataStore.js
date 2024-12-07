import { formatDate } from "date-fns";

export class DataStoreClass {
  constructor(taskClass, subTaskClass) {
    this.taskClass = taskClass;
    this.subTaskClass = subTaskClass;
  }

  #taskArray = [
    // {
    //   taskID: "task-id-3",
    //   taskName: "Team Meeting",
    //   description: "Discuss project progress and next steps.",
    //   priority: "Low",
    //   project: "Personal",
    //   dueDate: "2024-03-01",
    //   subTaskArr: [
    //     {
    //       subTaskDescription: "Prepare meeting agenda",
    //       subTaskCompleted: true,
    //     },
    //     {
    //       subTaskDescription: "Share updates on tasks",
    //       subTaskCompleted: false,
    //     },
    //     {
    //       subTaskDescription: "Record meeting minutes",
    //       subTaskCompleted: false,
    //     },
    //   ],
    // },
    // {
    //   taskID: "task-id-1",
    //   taskName: "Complete To-Do App",
    //   description: "Finalize all features for the to-do list app.",
    //   priority: "High",
    //   project: "Personal",
    //   dueDate: "2024-12-31",
    //   subTaskArr: [
    //     { subTaskDescription: "Design UI", subTaskCompleted: true },
    //     {
    //       subTaskDescription: "Implement Task CRUD functionality",
    //       subTaskCompleted: false,
    //     },
    //     { subTaskDescription: "Test app for bugs", subTaskCompleted: false },
    //   ],
    // },
    // {
    //   taskID: "task-id-2",
    //   taskName: "Write Documentation",
    //   description: "Create a detailed user guide for the app.",
    //   priority: "Medium",
    //   project: "Personal",
    //   dueDate: "2024-12-06",
    //   subTaskArr: [
    //     {
    //       subTaskDescription: "Outline documentation structure",
    //       subTaskCompleted: true,
    //     },
    //     { subTaskDescription: "Write usage examples", subTaskCompleted: false },
    //     { subTaskDescription: "Review for clarity", subTaskCompleted: false },
    //   ],
    // },
  ];
  #projectListArr = ["Personal", "Work"];

  #lastID = 0;

  #idGen() {
    return `task-id-${this.#lastID++}`;
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
      taskID: dataObject.taskID || this.#idGen(),
      taskName: dataObject.taskName || "",
      description: dataObject.description || "",
      priority: dataObject.priority || "",
      project: dataObject.project || "",
      dueDate: dataObject.dueDate || "",
      subTaskArr: dataObject.subTaskArr || "",
      createdDate: dataObject.createdDate || "",
      completed: dataObject.createdDate || false,
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
    console.log(this.#taskArray);
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
  }

  taskCompleteToggle(taskID) {
    const taskIndex = this.#taskArray.findIndex((e) => {
      return taskID === e.taskID;
    });
    this.#taskArray[taskIndex].toggleComplete();
  }

  deleteTask(taskID) {
    const taskIndex = this.#taskArray.findIndex((e) => {
      return taskID === e.taskID;
    });

    if (taskIndex === -1) {
      return console.log("The task you are trying to delete does not exist"); //TODO: Add error handling
    }

    this.#taskArray.splice(taskIndex, 1);
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
  }

  get taskArr() {
    return this.#taskArray;
  }

  importTasks(tasksArr) {
    tasksArr.forEach(element => {
      this.createTask(element);
    });
  }

  saveToStorage() {
    const dataObj = {
      tasks: this.#taskArray,
      projects: this.#projectListArr,
      lastID: this.#lastID
    }
    localStorage.setItem("todoLocalData", JSON.stringify(dataObj));
  }

  // loadFromStorage() {
  //   if(localStorage.getItem("todoLocalData")) {
  //     const dataObj = JSON.parse(localStorage.getItem("todoLocalData"));
  //     this.#lastID = dataObj.lastID;
  //     this.#projectListArr = dataObj.projects;

  //     dataObj.tasks.forEach(element => {
        
  //     });
  //   }
  // }
}
