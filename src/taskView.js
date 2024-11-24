export class taskViewClass {
    constructor(taskObj) {
        this.taskDataObj = taskObj;
    }

    tasks = this.taskDataObj.taskArr;

}