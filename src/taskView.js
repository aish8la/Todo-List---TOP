import { compareAsc } from "date-fns";

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
        const incompleteTasks = this.tasks.filter(e => {
            return !e.completed;
        });
        return incompleteTasks;
    }

    sortPriority() {
        this.updateArr();
        const priorityOder = {"High":1, "Medium": 2, "Low": 3};
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