export class UIControllerClass {

    constructor(dataObj,displayObj, taskViewObj) {
        this.displayObj = displayObj;
        this.dataObj = dataObj;
        this.taskViewObj = taskViewObj
        }

    //Sidebar click event handlers


    //Initialize the whole app

    initializeApp(defaultData) {
        this.dataObj.initializeData(defaultData);
        this.taskViewObj.initializeTaskView();
        this.displayObj.initializeDisplay();
    }
    }