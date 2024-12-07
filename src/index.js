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

const tasksArray = [
    {
      taskID: "task-id-25",
      taskName: "Complete To-Do App",
      description: "Finalize all features for the to-do list app.",
      priority: "High",
      project: "Web Development",
      dueDate: "2024-12-01",
      subTaskArr: [
        { subTaskDescription: "Design UI", subTaskCompleted: true },
        { subTaskDescription: "Implement Task CRUD functionality" },
        { subTaskDescription: "Test app for bugs", subTaskCompleted: false }
      ],
      createdDate: "2024-11-24",
      completed: true,
    },
    {
      taskID: "task-id-26",
      taskName: "Write Documentation",
      description: "Document all features and setup instructions for the project.",
      priority: "Medium",
      project: "Web Development",
      dueDate: "2024-12-05",
      subTaskArr: [
        { subTaskDescription: "Write README file", subTaskCompleted: true },
        { subTaskDescription: "Document API endpoints" },
        { subTaskDescription: "Include installation steps", subTaskCompleted: false }
      ],
      createdDate: "2024-11-25",
      completed: false,
    },
    {
      taskID: "task-id-27",
      taskName: "Learn React",
      description: "Start learning React basics and build a small project.",
      priority: "High",
      project: "Learning",
      dueDate: "2024-12-10",
      subTaskArr: [
        { subTaskDescription: "Watch React tutorials", subTaskCompleted: true },
        { subTaskDescription: "Practice building components" },
        { subTaskDescription: "Create a mini React app", subTaskCompleted: false }
      ],
      createdDate: "2024-11-26",
      completed: false,
    },
    {
      taskID: "task-id-28",
      taskName: "Clean Workspace",
      description: "Organize and clean the physical and digital workspace.",
      priority: "Low",
      project: "Personal",
      dueDate: "2024-12-03",
      subTaskArr: [
        { subTaskDescription: "Clean desk", subTaskCompleted: true },
        { subTaskDescription: "Sort digital files" },
        { subTaskDescription: "Recycle old notes", subTaskCompleted: false }
      ],
      createdDate: "2024-11-24",
      completed: false,
    },
    {
      taskID: "task-id-29",
      taskName: "Plan Holiday Trip",
      description: "Plan a trip for the holidays, including itinerary and bookings.",
      priority: "Medium",
      project: "Personal",
      dueDate: "2024-12-20",
      subTaskArr: [
        { subTaskDescription: "Choose destination", subTaskCompleted: true },
        { subTaskDescription: "Book flights and accommodation" },
        { subTaskDescription: "Prepare a travel checklist", subTaskCompleted: false }
      ],
    }
  ];
  
app.importTasks(tasksArray);

// app.deleteTask("task-id-0");

// app.modfiyTask(
//     {
//         taskID: "task-id-1",
//         taskName: "Changed",
//     }
// );

// app.taskCompleteToggle("task-id-1");

// taskView.filterCompleteTasks();

// taskView.filterDayDifference(0);
// app.addProject("Personal");
// app.deleteProject("work");
taskView.upcomingFiltered();
app.saveToStorage();
