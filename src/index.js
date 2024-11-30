import "./style.css";
import { TaskClass } from "./taskManager";
import { DataStoreClass } from "./dataStore";
import { SubTaskClass } from "./taskManager";
import { UIControllerClass } from "./UIController";
import { taskViewClass } from "./taskView";

// Instantiated Objects

const app = new DataStoreClass(TaskClass, SubTaskClass);
const UI = new UIControllerClass();
const taskView = new taskViewClass(app);

// Sample Data 

// const taskData = {
//     taskID: "task-id-1",
//     taskName: "Complete To-Do App",
//     description: "Finalize all features for the to-do list app.",
//     priority: "High",
//     project: "Web Development",
//     dueDate: "2024-12-01",
//     subTaskArr: [
//       { 
//         subTaskDescription: "Design UI", 
//         subTaskCompleted: true 
//       },
//       { 
//         subTaskDescription: "Implement Task CRUD functionality", 
//       },
//       { 
//         subTaskDescription: "Test app for bugs", 
//         subTaskCompleted: false 
//       }
//     ],
//   };

// app.createTask(taskData);
// app.createTask(taskData);

// app.deleteTask("task-id-0");

// app.modfiyTask(
//     {
//         taskID: "task-id-1",
//         taskName: "Changed",
//     }
// );

// app.taskCompleteToggle("task-id-1");

// taskView.filterCompleteTasks();

taskView.filterDayDifference(0);
