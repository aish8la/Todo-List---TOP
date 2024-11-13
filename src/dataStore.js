export class DataStoreClass {
    constructor(taskClass, subTaskClass) {
        this.taskClass = taskClass;
        this.subTaskClass = subTaskClass;
    }

    #taskArray = [];
    #projectListArr = [];

    #lastID = 0;

    #idGen() {
        return `task-id-${this.#lastID++}`;
    }

    #pushToArray(element, targetArray) {
        targetArray.push(element);
    }

    createTask(dataObject) {
        const data = dataObject;
        const task = new this.taskClass(
            this.#idGen(),
            data.taskName,
            data.description,
            data.priority,
            data.project,
            data.dueDate,
            data.subtaskObj,
            data.completed
        );
        this.#pushToArray(task, this.#taskArray);
    };
}