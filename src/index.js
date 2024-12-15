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