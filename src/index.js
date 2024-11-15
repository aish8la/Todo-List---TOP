import "./style.css";
import { TaskClass } from "./taskManager";
import { DataStoreClass } from "./dataStore";
import { SubTaskClass } from "./taskManager";

// Instantiated Objects

const App = new DataStoreClass(TaskClass, SubTaskClass);

// Sample Data 

const taskData = {
    taskName: "Complete To-Do App",
    description: "Finalize all features for the to-do list app.",
    priority: "High",
    project: "Web Development",
    dueDate: "2024-12-01",
    subTaskArr: [
      { 
        subTaskDescription: "Design UI", 
        subTaskCompleted: true 
      },
      { 
        subTaskDescription: "Implement Task CRUD functionality", 
      },
      { 
        subTaskDescription: "Test app for bugs", 
        subTaskCompleted: false 
      }
    ],
  };

App.createTask(taskData);