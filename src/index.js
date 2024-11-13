import "./style.css";
import { TaskClass } from "./taskManager";
import { DataStoreClass } from "./dataStore";

// Instantiated Objects

const App = new DataStoreClass(TaskClass);

App.createTask(
    {
        taskID: "T475",
        taskName: "Website Redesign",
        description: "Update the company website with new branding elements and improve mobile responsiveness",
        priority: "Medium",
        project: "Marketing",
        dueDate: new Date("2024-02-15"),
        subtaskObj: {
            subtask1: "Design mockups",
            subtask2: "Code frontend",
            subtask3: "Test responsiveness",
            subtask4: "Deploy changes"
        },
        completed: false
    }  
)