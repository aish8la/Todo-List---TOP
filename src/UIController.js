export class UIControllerClass {

    constructor(dataObj,displayObj, taskViewObj) {
        this.displayObj = displayObj;
        this.dataObj = dataObj;
        this.taskViewObj = taskViewObj
        }

    //Sidebar click event handlers

    addSidbarClickHnd(sidebarContainer) {

        const sideBarParent = sidebarContainer;

        sideBarParent.addEventListener("click", (e) => {
            if(e.target.id === "add-task-btn") { this.addTaskClick() }
        });
    }

    addTaskClick() {
        this.displayObj.renderForm();
    }


    //Initialize the event handlers

    initializeEventHndl(sidebarCtnElm) {
        this.addSidbarClickHnd(sidebarCtnElm);
    }


    //Initialize the whole app

    initializeApp(defaultData) {
        this.dataObj.initializeData(defaultData);
        this.taskViewObj.initializeTaskView();
        this.displayObj.initializeDisplay();
        this.initializeEventHndl(this.displayObj.sidebarContainer);
    }
    }