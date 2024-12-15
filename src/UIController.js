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
        this.formCtnClickHnd(document.querySelector("#form-container"));
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
    
    taskWindowClickHnd(mainContainerElm) {

        const taskWindowCtn = mainContainerElm;

        taskWindowCtn.addEventListener("click", (e) => {
            if(e.target.dataset.eventTargetType === "task-checkbox") {

                this.toggleCompleteClck(e.target);

            } else if(e.target.closest('li[data-elem-type="task-li"]')) {
               this.taskItemClck(e.target.closest('li[data-elem-type="task-li"]'));
            }
        });
    }

    toggleCompleteClck(target) {
        const taskID = target.dataset.taskId;
        this.dataObj.taskCompleteToggle(taskID);
        this.displayObj.renderTasklist();
    }

    taskItemClck(target) {
        const taskID = target.dataset.taskId;
        this.displayObj.renderForm(taskID);
        this.formCtnClickHnd(document.querySelector("#form-container"));
    }


    // Task Form Event Handler

    formCtnClickHnd(formCtn) {
        const formElm = formCtn.querySelector('form'); 

        formCtn.addEventListener("click", e => {
            if(e.target.id === "form-cls-btn") {
                this.closeForm();
            }
            if(e.target.id === "task-dlt-button") {
                this.deleteTask(formCtn);
            }
            if(e.target.dataset.eventTargetType === "subTask-dlt-btn") {
                this.deleteSubtask(e.target);
            }
            if(e.target.id === "add-sub-task-btn") {
                this.addNewSubtask();
            }

        });

        formElm.addEventListener("submit", (e) => {
            e.preventDefault();
            if(formElm.id === "new-task-form") {
                
                this.saveNewTask(e.target);
                //TODO: code to run to save new task
            }
        });
    }

    closeForm() {
        this.displayObj.removeElement("#form-container");
    }

    deleteTask(target) {
        const taskID = target.dataset.taskId;
        //TODO: add a function to confirm deletion
        this.dataObj.deleteTask(taskID);
        this.displayObj.renderTasklist();
        this.closeForm();
    }

    deleteSubtask(childTarget) {
        const parentElm = childTarget.closest("li.sub-task-item");
        this.displayObj.removeTargetElm(parentElm);
    }

    addNewSubtask() {
        this.displayObj.newSubTaskRender();
    }

    saveNewTask(formElm) {
        this.displayObj.taskFormData(formElm);
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
        this.initializeEventHndl(this.displayObj.sidebarContainer, this.displayObj.displayContainer);
    }
    }