import {
  compareAsc,
  differenceInCalendarDays,
  isWithinInterval,
  interval,
  isFuture,
  startOfDay,
} from "date-fns";

export class taskViewClass {
  constructor(taskObj) {
    this.taskDataObj = taskObj;
    this.tasks = [...taskObj.taskArr] || [];
  }

  updateArr() {
    this.tasks = [...this.taskDataObj.taskArr];
  }

  filterCompleteTasks() {
    this.tasks = this.tasks.filter((e) => {
      return !e.completed;
    });
  }

  filterDayDifference(numOfDays) {
    const currentDate = new Date();
    this.tasks = this.tasks.filter((e) => {
      return differenceInCalendarDays(e.dueDate, currentDate) <= numOfDays;
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
    this.tasks = this.filterDayDifference(0);
    return this.tasks;
  }

  upcomingFiltered() {
    this.updateArr();
    this.defaultSort();
    this.tasks.filter(task => {
      return isFuture(startOfDay(task.dueDate));
    });
    return this.tasks;
  }
}
