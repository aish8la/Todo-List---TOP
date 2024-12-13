export class UIControllerClass {

    constructor(dataObj,displayObj, taskViewObj) {
        this.displayObj = displayObj;
        this.dataObj = dataObj;
        this.taskViewObj = taskViewObj
        }

    //Sidebar click event handlers

    addSidebarClickHnd(sidebarContainer) {

        const sideBarParent = sidebarContainer;

        sideBarParent.addEventListener("click", (e) => {
            if(e.target.id === "add-task-btn") { this.addTaskClick() }
            if(e.target.id === "add-project-btn") { this.addProjectClick() }
            if(e.target.dataset.eventTargetType === "side-menu-itm") { this.sideMenuItmClck(e.target) }
            if(e.target.dataset.eventTargetType === "side-menu-prj-itm") { this.sideMenuPrjClck(e.target) }
            if(e.target.dataset.eventTargetType === "prj-dlt-button") { this.projectDeleteClck(e.target) }
        });
    }

    addTaskClick() {
        this.displayObj.renderForm();
    }

    addProjectClick() {
        this.displayObj.addProjectDialog();
    }

    sideMenuItmClck(targetElm) {
        const viewType = targetElm.dataset.taskViewMenuItm;
        this.taskViewObj.navBarItems[viewType]();
        this.displayObj.renderTasksWindow();
    }

    sideMenuPrjClck(targetElm) {
        const project = targetElm.dataset.prjctName;
        this.taskViewObj.projectTasks(project);
        this.displayObj.renderTasksWindow();
    }

    projectDeleteClck() {
        //TODO: add delete confirmation and action
    }

    //Task Window Event Listeners
    
    taskWindowClickHnd(taskWindowElm) {

        const taskWindowCtn = taskWindowElm;

        taskWindowCtn.addEventListener("click", (e) => {
            console.log(e.target);
        });
    }
    
    //Initialize the event handlers

    initializeEventHndl(sidebarCtnElm, taskWindElem) {
        this.addSidebarClickHnd(sidebarCtnElm);
        this.taskWindowClickHnd(taskWindElem);
    }


    //Initialize the whole app

    initializeApp(defaultData) {
        this.dataObj.initializeData(defaultData);
        this.taskViewObj.initializeTaskView();
        this.displayObj.initializeDisplay();
        this.initializeEventHndl(this.displayObj.sidebarContainer, this.displayObj.taskWindowContainer);
    }
    }