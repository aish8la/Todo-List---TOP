import { formatDate } from "date-fns";

export class DataStoreClass {
    constructor(taskClass, subTaskClass) {
        this.taskClass = taskClass;
        this.subTaskClass = subTaskClass;
    }

    #taskArray = [];
    #projectListArr = ["Personal", "Work"];

    #lastID = 0;

    #idGen() {
        return `task-id-${this.#lastID++}`;
    }

    #createSubTask(subTaskDataArr) {
        const newArr = [];
        subTaskDataArr.forEach((element) => {
            const newSubTask = new this.subTaskClass(
                element.subTaskDescription,
                element.subTaskCompleted
            )
            newArr.push(newSubTask);
        });
        return newArr;
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
            this.#createSubTask(data.subTaskArr),
            data.completed,
        );
        this.#taskArray.push(task);
        console.log(this.#taskArray);
    };
}