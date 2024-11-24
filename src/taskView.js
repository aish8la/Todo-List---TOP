export class taskViewClass {
    constructor(taskObj) {
        this.taskDataObj = taskObj;
        this.tasks = taskObj.taskArr || [];
        
    }

    filterCompleteTasks() {
        const incompleteTasks = this.tasks.filter(e => {
            return !e.completed;
        });
        console.log(incompleteTasks);
    }

}