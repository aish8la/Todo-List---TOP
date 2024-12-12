import {
  compareAsc,
  differenceInCalendarDays,
  isWithinInterval,
  interval,
  isFuture,
  startOfDay,
} from "date-fns";
import { ar } from "date-fns/locale";

export class taskViewClass {
  constructor(taskObj) {
    this.taskDataObj = taskObj;
    this.tasks = [...(taskObj.taskArr || [])];
    this.projects = taskObj.projectArr;
  }

  navBarItems = [
    "Today",
    "Upcoming",
]

  currentView = {
    "title": "",
    "func" : "",
    "args" : ""
  }

  updateArr() {
    this.tasks = [...(this.taskDataObj.taskArr || [])];
  }

  filterCompleteTasks() {
    this.tasks = this.tasks.filter((e) => {
      return !e.completed;
    });
  }

  filterDayDifference(numOfDays) {
    const currentDate = new Date();
    this.tasks = this.tasks.filter((e) => {
      if(differenceInCalendarDays(e.dueDate, currentDate) <= numOfDays) {
        return true;
      }
    });
  }

  filterProject(project) {
    this.tasks = this.tasks.filter((task) => {
      return task.project.toLowerCase() === project.toLowerCase();
    });
  }

  filterDateRange(startDate, endDate) {
    this.tasks = this.tasks.filter((task) => {
      return isWithinInterval(task.dueDate, interval(startDate, endDate));
    });
  }

  findTaskByID(taskID) {
    const taskObj = this.tasks.find(task => {
      return task.taskID === taskID;
    });
    return taskObj;
  }

  sortPriority() {
    const priorityOder = { High: 1, Medium: 2, Low: 3 };
    this.tasks.sort((a, b) => {
      return priorityOder[a.priority] - priorityOder[b.priority];
    });
  }

  sortDue() {
    this.tasks.sort((a, b) => {
      return compareAsc(a.dueDate, b.dueDate);
    });
  }

  defaultSort() {
    this.filterCompleteTasks();
    this.sortPriority();
    this.sortDue();
  }

  allTasks() {
    this.updateArr();
    this.defaultSort();
    return this.tasks;
  }

  todayFiltered() {
    this.updateArr();
    this.defaultSort();
    this.filterDayDifference(0);
    this.switchCurrentView(this.todayFiltered, undefined, "Today");
    return this.tasks;
  }

  upcomingFiltered() {
    this.updateArr();
    this.defaultSort();
    this.tasks.filter(task => {
      return isFuture(startOfDay(task.dueDate));
    });
    this.switchCurrentView(this.upcomingFiltered, undefined, "Upcoming");
    return this.tasks;
  }

  projectTasks(project) {
    this.updateArr();
    this.defaultSort();
    this.filterProject(project);
    this.switchCurrentView(this.projectTasks, project, project);
    return this.tasks;
  }

  switchCurrentView(func, arg, title) {
    this.currentView.func = func.bind(this, arg);
    this.currentView.title = title;
    this.currentView.args = arg;
  }

  initializeTaskView() {
    this.switchCurrentView(this.todayFiltered, undefined, "Today");
  }
}
