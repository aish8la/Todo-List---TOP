import { compareAsc, differenceInCalendarDays } from "date-fns";

export class taskViewClass {
  constructor(taskObj) {
    this.taskDataObj = taskObj;
    this.tasks = [...taskObj.taskArr] || [];
  }

  updateArr() {
    this.tasks = [...this.taskDataObj.taskArr];
  }

  filterCompleteTasks() {
    this.updateArr();
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

  sortPriority() {
    this.updateArr();
    const priorityOder = { High: 1, Medium: 2, Low: 3 };
    const prioritySorted = this.tasks.toSorted((a, b) => {
      return priorityOder[a.priority] - priorityOder[b.priority];
    });
    return prioritySorted;
  }

  sordDue() {
    this.updateArr();
    const sortedAscDue = this.tasks.toSorted(compareAsc);
    return sortedAscDue;
  }
}
