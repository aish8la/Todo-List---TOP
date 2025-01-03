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
        this.addPrjDialogClck();
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

    projectDeleteClck(target) {
        const projectName = target.dataset.prjDeleteBtn;

        this.displayObj.confirmDialog("Confirmation", "Are you sure you want to delete this ?");
        // function passed to confirmDialogClck function to attach to confirm button
        this.confirmationDialogClck(() => {
            let alert = false;
            alert = this.dataObj.deleteProject(projectName);
            this.alertDialog(alert);
            this.displayObj.renderSidebarPrjList();
        });

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
            } else if(e.target.id === "task-dlt-button") {
                this.deleteTask(formCtn);
            } else if(e.target.dataset.eventTargetType === "subTask-dlt-btn") {
                this.deleteSubtask(e.target);
            } else if(e.target.id === "add-sub-task-btn") {
                this.addNewSubtask();
            }
        });

        formElm.addEventListener("submit", (e) => {
            e.preventDefault();
            if(formElm.id === "new-task-form") {
                this.saveNewTask(e.target);
            } else if(formElm.id === "modify-task-form") {
                this.modifyCurrentTask(e.target);
            }
        });
    }

    closeForm() {
        this.displayObj.removeElement("#form-container");
    }

    deleteTask(target) {
        const taskID = target.dataset.taskId;
        this.displayObj.confirmDialog("Confirmation", "Are you sure you want to delete this ?");
        // function passed to confirmDialogClck function to attach to confirm button
        this.confirmationDialogClck(() => {
            let alert = false;
            alert = this.dataObj.deleteTask(taskID);
            this.alertDialog(alert);
            this.displayObj.renderTasklist();
            this.closeForm();
        });
    }

    deleteSubtask(childTarget) {
        const parentElm = childTarget.closest("li.sub-task-item");
        this.displayObj.removeTargetElm(parentElm);
    }

    addNewSubtask() {
        this.displayObj.newSubTaskRender();
    }

    saveNewTask(formElm) {
        const taskData = this.displayObj.taskFormData(formElm);
        this.dataObj.createTask(taskData);
        this.displayObj.renderTasklist();
        this.closeForm();
    }

    modifyCurrentTask(formElm) {
        const newData = this.displayObj.taskFormData(formElm);
        this.dataObj.modifyTask(newData);
        this.displayObj.renderTasklist();
        this.closeForm();
    }

    //dialog event handlers

    closeDialog(target) {
        this.displayObj.removeTargetElm(target);
    }

    cancelDialogClck(dialogOverlayElm) {
        dialogOverlayElm.addEventListener("click", e => {
            
            if(e.target.dataset.eventTargetType === "dialog-close") {
                this.closeDialog(dialogOverlayElm);
            }
        });
    }

    addPrjDialogClck() {
        const dialogOverlay = document.querySelector("#add-project-dlg-ovl");
        this.cancelDialogClck(dialogOverlay);
        const form = dialogOverlay.querySelector('form');
        let alert = false;

        form.addEventListener("submit", e => {
            e.preventDefault();
            const projectName = this.displayObj.projectFormData(form);
            alert = this.dataObj.addProject(projectName);
            this.alertDialog(alert);
            this.displayObj.renderSidebarPrjList();
            this.closeDialog(dialogOverlay);
 
        });
    }

    confirmationDialogClck(func) {
        const dialogOverlay = document.querySelector("#confirm-dlg-ovl");
        this.cancelDialogClck(dialogOverlay);

        dialogOverlay.addEventListener("click", e => {
            if(e.target.dataset.eventTargetType === "dialog-confirm") {
                func();
                this.closeDialog(dialogOverlay);
            }
        });
    }

    alertDialog(alert) {
        if(alert) {
            const {title, bodyText} = alert;
            this.displayObj.alertDialog(title, bodyText);
            const dialogOverlay = document.querySelector("#alert-dlg-ovl");
            this.cancelDialogClck(dialogOverlay);
        }
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