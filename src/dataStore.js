class DataStoreClass {
    constructor(taskClass) {
        this.taskClass = taskClass;
    }

    #taskArray = [];
    #projectListArr = [];

    #lastID = 0;

    #idGen() {
        return `task-id-${this.#lastID++}`;
    }
}