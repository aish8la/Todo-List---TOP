import {
  compareAsc,
  differenceInCalendarDays,
  isWithinInterval,
  interval,
  isPast,
  isToday,
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
    const incompleteTasks = this.tasks.filter((e) => {
      return !e.completed;
    });
    return incompleteTasks;
  }

  filterDayDifference(numOfDays) {
    const currentDate = new Date();
    const dayDiffFilteredTask = this.tasks.filter((e) => {
      return differenceInCalendarDays(e.dueDate, currentDate) <= numOfDays;
    });
    return dayDiffFilteredTask;
  }

  filterProject(project) {
    const filterByProject = this.tasks.filter((task) => {
      return task.project.toLowerCase() === project.toLowerCase();
    });
    return filterByProject;
  }

  filterDateRange(startDate, endDate) {
    const rangeFiltered = this.tasks.filter((task) => {
      return isWithinInterval(task.dueDate, interval(startDate, endDate));
    });

    return rangeFiltered;
  }

  sortPriority() {
    const priorityOder = { High: 1, Medium: 2, Low: 3 };
    const prioritySorted = this.tasks.toSorted((a, b) => {
      return priorityOder[a.priority] - priorityOder[b.priority];
    });
    return prioritySorted;
  }

  sortDue() {
    const sortedAscDue = this.tasks.toSorted((a, b) => {
      return compareAsc(a.dueDate, b.dueDate);
    });
    return sortedAscDue;
  }

  defaultSort() {
    this.tasks = this.filterCompleteTasks();
    this.tasks = this.sortPriority();
    this.tasks = this.sortDue();
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
}
