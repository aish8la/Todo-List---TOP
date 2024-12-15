import "./style.css";
import { TaskClass, SubTaskClass } from "./taskManager";
import { UIControllerClass } from "./UIController";
import { taskViewClass } from "./taskView";
import { MainDisplayElements } from "./displayController";
import { DataStoreClass } from "./dataStore";
import { defaultData } from "./defaultData";

// Instantiated Objects


const dataObj = new DataStoreClass(TaskClass, SubTaskClass);
const taskView = new taskViewClass(dataObj);
const displayObj = new MainDisplayElements(taskView);
const UIObject = new UIControllerClass(dataObj, displayObj, taskView);
  
// Initialize App
UIObject.initializeApp(defaultData);

//Test Functions
UIObject.addTaskClick();
const form = document.querySelector('input[name="taskName"]');
form.value = "TAsk";
UIObject.addNewSubtask();
UIObject.addNewSubtask();
UIObject.saveNewTask(document.querySelector("form"));






// console.log(app.taskArr);
// displayObj.displayInit();

// displayObj.renderForm("task-id-4");
// displayObj.newSubTaskRender();
// console.log(taskView.tasks);
// console.log(displayObj.taskViewObj.findTaskByID("task-id-4"));
// console.log(taskView.findTaskByID("task-id-4"));