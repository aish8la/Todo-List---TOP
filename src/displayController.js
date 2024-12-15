import { format } from "date-fns";

export class DisplayRenderClass {

        displayContainer = document.querySelector("#display-ctn");


    elementGen(type, attr = {}, textContent) {
        const newElmt = document.createElement(type);
        newElmt.textContent = textContent;

        for( const key of Object.keys(attr) ) {
            newElmt.setAttribute(key, attr[key]);
        }
        return newElmt;
    }

    nodeGen(nodeObj) {
        const element = document.createElement(nodeObj.tag);

        if(nodeObj.content) {
            element.textContent = nodeObj.content;
        }

        if(nodeObj.attributes) {
            Object.entries(nodeObj.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }

        if(nodeObj.children) {
            nodeObj.children.forEach(child => element.appendChild(this.nodeGen(child)));
        }

        return element;
    }

    removeElement(selector) {
        const target = this.displayContainer.querySelector(selector);
        if(target) {
            this.displayContainer.removeChild(target);
        }
    }

    removeChildElements(parentSelector) {
        const parent = this.displayContainer.querySelector(parentSelector);
        if(parent) {
            while(parent.hasChildNodes()) {
                parent.removeChild(parent.firstChild);
            }
        }
    }

    removeTargetElm(target) {
        if(target) {
            target.remove();
        }
    }
}

export class MainDisplayElements extends DisplayRenderClass {

    constructor(taskViewObj) {
        super();
        this.taskViewObj = taskViewObj;
    }

    sidebarContainer;

    //Sidebar render
    renderNavSidebar() {

        this.removeElement("#sidebar-ctn");

        // object containing node list like data for generating the DOM elements
        const elements = {
            tag: "div",
            attributes: { class: "nav-sidebar sidebar", "id": "sidebar-ctn" },
            children: [
                {
                    tag: "button",
                    attributes: { class: "add-task-btn button", "data-event-target-type" : "button", "id" : "add-task-btn" },
                    content: "Add Task",
                },
                {
                    tag: "div",
                    attributes: { class: "category-section" },
                    children: [
                        {
                            tag: "div",
                            attributes: { class: "sidebar-title" },
                            content: "Tasks",
                        },
                        {
                            tag: "ul",
                            attributes: { class: "category-list no-decoration-list", "id" : "view-menu" },
                        },
                    ],
                },

                {
                    tag: "div",
                    attributes: { class: "projects-section" },
                    children: [
                        {
                            tag: "div",
                            attributes: { class: "sidebar-title-container" },
                            children: [
                                {
                                    tag: "div",
                                    attributes: { class: "sidebar-title" },
                                    content: "Projects",
                                },
                                {
                                    tag: "button",
                                    attributes: { class: "add-project-btn", type: "button", "data-event-target-type" : "button", "id" : "add-project-btn" },
                                    content: "+",
                                },
                            ],
                        },
                        {
                            tag: "ul",
                            attributes: { class: "project-list no-decoration-list", "id" : "project-menu" },
                        },
                    ],
                },
            ],
        };

        this.displayContainer.appendChild(this.nodeGen(elements));
        this.renderSidebarMenuList();
        this.renderSidebarPrjList();
        this.sidebarContainer = document.querySelector("#sidebar-ctn");
    }

    renderSidebarMenuList() {

        this.removeChildElements("#view-menu");

        const menuList = document.querySelector(".category-list");
        
        Object.entries(this.taskViewObj.navBarItems).forEach(([key, value]) => {

            const list = this.elementGen("li", {"data-task-view-menu-itm": `${key}`, "data-event-target-type" : "side-menu-itm"}, key);
            menuList.appendChild(list);
        });

        
    }

    renderSidebarPrjList() {

        this.removeChildElements("#project-menu");

        const projectSection = document.querySelector(".project-list");

        this.taskViewObj.projects.forEach(project => {

            const list = this.elementGen("li", {"data-prjct-name": `${project}`, "data-event-target-type" : "side-menu-prj-itm"}, project);
            const button = this.elementGen("button", {class: "project-delete-btn", "data-prj-delete-btn": `${project}`, "data-event-target-type" : "prj-dlt-button"});
            list.appendChild(button);
            projectSection.appendChild(list);
        });
    }

    //Main window render

    taskWindowContainer;

    renderTasksWindow() {

        this.removeElement("#task-window");

        const element = this.elementGen("div", {class: "content-space", "id": "task-window"});
        element.appendChild(this.elementGen("div", {class: "content-title"}, this.taskViewObj.currentView.title));
        element.appendChild(this.elementGen("ul", {class: "task-list-ctn no-decoration-list", "id" : "task-container"}));
        this.displayContainer.appendChild(element);

        this.renderTasklist();

        this.taskWindowContainer = document.querySelector("#task-window");
    }


    renderTasklist() {

        this.removeChildElements("#task-container");

        const renderTaskList = this.taskViewObj.currentView.func();

        const contentSpace = document.querySelector("#task-container");

        renderTaskList.forEach(taskItem => {

            let formatDate = "";

            if(taskItem.dueDate) {
                formatDate = format(taskItem.dueDate, 'MMM do yy');
            }
            

            const listElm = this.elementGen("li", {class: "task-item", "data-elem-type": "task-li", "data-task-id": taskItem.taskID});
            const itmOne = this.elementGen("div", {class: "task-item-line-one task-item-line", "data-task-id": taskItem.taskID});
            const checkBoxElm = this.elementGen("input", {"type" : "checkbox", class: "task-item-check-box", "data-task-id": taskItem.taskID, "data-event-target-type" : "task-checkbox"});
            checkBoxElm.checked = taskItem.completed;
            itmOne.appendChild(checkBoxElm);
            itmOne.appendChild(this.elementGen("div", {class: "list-task-title", "data-task-id": taskItem.taskID}, taskItem.taskName));
            listElm.appendChild(itmOne);            

            const itmTwo = this.elementGen("div", {class: "task-item-line-two task-item-line", "data-task-id": taskItem.taskID});
            itmTwo.appendChild(this.elementGen("div", {class: `list-task-item-project ${taskItem.project}`, "data-task-id": taskItem.taskID}, taskItem.project));
            itmTwo.appendChild(this.elementGen("div", {class: "list-task-due", "data-task-id": taskItem.taskID}, formatDate));
            itmTwo.appendChild(this.elementGen("div", {class: `list-task-priority ${taskItem.priority}-Priority`, "data-task-id": taskItem.taskID}, taskItem.priority));
            listElm.appendChild(itmTwo);
            
            contentSpace.appendChild(listElm);
        });
    }

    //Form Render

    formStrucure = {
        tag: "div",
        attributes: {"class": "form-container", "id" : "form-container"},
        children: [
            {
                tag: "button",
                attributes: {"class":"form-close-btn", "id" : "form-cls-btn"},
                content: "\u2716",
            },
            {
                tag: "form",
                attributes: {"action":"", "method": "post", "class": "task-form", "id" : "new-task-form"},
                children: [
                    {
                        tag:"div",
                        attributes: {"class": "form-title"},
                        content: "Task:"
                    },
                    {
                        tag: "input",
                        attributes: {"type": "text", "class":"form-task-title form-input", "placeholder": "Task Name", "required":"", "name": "taskName"},
                    },
                    {
                        tag: "textarea",
                        attributes: {"class": "form-task-description form-input", "placeholder": "Description", "name": "description"}
                    },
                    {
                        tag: "div",
                        attributes: {"class": "form-input-div priority-input"},
                        children: [
                            {
                                tag: "label",
                                attributes: {"for": "priority", "class": "form-input-lable"},
                                content: "Priority"
                            },
                            {
                                tag: "select",
                                attributes: {"id": "priority", "name": "priority", "class": "form-input priority-input"},
                                children: [
                                    {
                                        tag: "option",
                                        attributes: {"selected":""},
                                        content: "Low"
                                    },
                                    {
                                        tag: "option",
                                        content: "Medium"
                                    },
                                    {
                                        tag: "option",
                                        content: "High"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag:"div",
                        attributes: {"class": "form-input-div project-input"},
                        children: [
                            {
                                tag: "label",
                                attributes: {"for": "project", "class": "form-input-lable"},
                                content: "Project"
                            },
                            {
                                tag: "select",
                                attributes: {"required": "", "id": "project", "name": "project", "class": "form-input project-input"},
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: {"class": "form-input-div due-date-input"},
                        children: [
                            {
                                tag: "label",
                                attributes: {"for": "due-date", "class": "form-input-lable"},
                                content: "Due Date"
                            },
                            {
                                tag: "input",
                                attributes: {"type": "date", "id": "due-date", "name":"dueDate", "class": "form-input due-date-input"}
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: {"class": "form-sub-task-container"},
                        children: [
                            {
                                tag: "div",
                                attributes: {"class": "sub-task-title-ctn"},
                                children: [
                                    {
                                        tag: "div",
                                        attributes: {"class": "form-sub-title"},
                                        content: "Subtask:"
                                    },
                                    {
                                        tag: "button",
                                        attributes: {"class": "sub-task-btn", "type": "button", "id" : "add-sub-task-btn"},
                                        content: "\u002B Add Subtask"
                                    },
                                ]
                            },
                            {
                                tag: "ul",
                                attributes: {"class": "sub-task-list-ctn no-decoration-list"},
                            }
                        ]
                    },
                    {
                        tag: "div",
                        attributes: {"class": "form-button-div"},
                        children: [
                            {
                                tag: "button",
                                attributes: {"type" : "submit", "class" : "form-button save-task-btn", "id" : "save-task-btn"},
                                content: "Save"
                            },
                        ]
                    }
                ]
            }
        ]
    } 


    // This object contains a map of form input name attribute value as key and task objects key name as value
    mapOfFormFields = {
        "taskName" : "taskName",
        "description" : "description",
        "priority" : "priority",
        "project" : "project",
        "dueDate" : "dueDate"
    }


    renderForm(taskID) {

        this.removeElement("#form-container");

        const formElm = this.nodeGen(this.formStrucure);

        let currentTask = "";

        if(taskID) {
            currentTask = this.taskViewObj.findTaskByID(taskID);
            const form = formElm.querySelector('form');
            form.id = "modify-task-form";
            form.dataset.taskId = taskID;
            const formBtnDiv = formElm.querySelector(".form-button-div");
            const submitFormBtn = formElm.querySelector(".form-button.save-task-btn");
            submitFormBtn.id = "modify-task-btn";
            formBtnDiv.insertBefore(this.elementGen("button", {"type" : "button", "class" : "form-button delete-task-btn", "id" : "task-dlt-button"}, "Delete"), submitFormBtn);
            formElm.dataset.taskId = taskID;
            
            let formField;
    
            Object.entries(this.mapOfFormFields).forEach(([key, data]) => {
                formField = formElm.querySelector(`[name="${key}"]`);
                if(formField.type === "date") {
                    formField.value = currentTask[data] ? format(currentTask[data], 'yyyy-MM-dd') : "";
                } else {
                    formField.value = currentTask[data];
                }    
            });

            if(currentTask.subTaskArr.length > 0) {
                const subTaskList = currentTask.subTaskArr;
                const subTaskCtn = formElm.querySelector("ul.sub-task-list-ctn");
                
                subTaskList.forEach(subTask => {
                    subTaskCtn.appendChild(this.SubTaskRender(subTask));
                });
            }
           
        }



        this.displayContainer.appendChild(formElm);
        this.updateProjectOption(formElm);
    }

    updateProjectOption(formElement) {

        const selectElm = formElement.querySelector("select.form-input.project-input");
        this.taskViewObj.projects.forEach(project => {
            selectElm.appendChild(this.elementGen("option",{},project));
        });
    }

    SubTaskRender(subTask) {

        const subTaskObj = {
            description: "",
            completed: false
        };

        if(subTask) {
            subTaskObj.description = subTask.subTaskDescription;
            subTaskObj.completed = subTask.subTaskCompleted;
        }
        
        
        const subTaskList = this.elementGen("li", {"class" : "sub-task-item", "data-type": "subtask"});
        const checkBoxElm = this.elementGen("input", {"type" : "checkbox", "class" : "subtask-check-box", "data-type": "subtask", "name" : "subTaskCompleted"});
        checkBoxElm.checked = subTaskObj.completed;
        subTaskList.appendChild(checkBoxElm);
        subTaskList.appendChild(this.elementGen("input", {"name" : "subTaskDescription", "type" : "text", "class" : "subtask-item-title", "placeholder" : "Subtask", "data-type": "subtask", "value": subTaskObj.description}));
        subTaskList.appendChild(this.elementGen("button", {"type" : "button", "class" : "sub-task-delete", "data-event-target-type" : "subTask-dlt-btn"}, "\u2716"));
        return subTaskList;
    }

    newSubTaskRender() {

        const subTaskUL = document.querySelector("ul.sub-task-list-ctn");
        subTaskUL.appendChild(this.SubTaskRender());
    }


    //Dialogu Renders


    renderDialogBox(title, id) {

        let dialogID;

        if(dialogID) {
            dialogID = id;
        } else {
            dialogID = "dialog-ovl";
        }

        const dialogOverlay = this.elementGen("div", {"class" : "dialog-overlay", "id" : dialogID});
        const dialogBox = this.elementGen("div", {"class" : "dialog-box"});
        const dialogTitle = this.elementGen("div", {"class" : "dialog-title"}, title);
        dialogBox.appendChild(dialogTitle);
        dialogOverlay.appendChild(dialogBox);

        return dialogOverlay
    }


    //Add project dialogue

    addProjectDialog() {

        this.removeElement("#add-task-dlg-ovl");

        const dialogOverlay = this.renderDialogBox("New Project", "add-task-dlg-ovl");
        const dialogBox = dialogOverlay.querySelector(".dialog-box");
        const form = this.elementGen("form",{"class" : "dialog-form"});
        form.appendChild(this.elementGen("input", {"type" : "text", "class" : "form-input dialog-input", "placeholder" : "Project Name", "required" : ""}));
        const buttonCtn = this.elementGen("div", {"class" : "dialog-buttons"});
        buttonCtn.appendChild(this.elementGen("button", {"type" : "button", "class" : "dialog-button dialog-cancel-btn"}, "Cancel"));
        buttonCtn.appendChild(this.elementGen("button", {"type" : "submit", "class" : "dialog-button dialog-save-btn"}, "Save"));
        form.appendChild(buttonCtn);
        dialogBox.appendChild(form);

        document.querySelector("body").appendChild(dialogOverlay)
    }

    confirmDialog(title, bodyText) {

        this.removeElement("#confirm-dlg-ovl");

        const dialogOverlay = this.renderDialogBox(title, "confirm-dlg-ovl");
        const dialogBox = dialogOverlay.querySelector(".dialog-box");
        const dialogBody = this.elementGen("div",{"class" : "dialog-form"});
        dialogBody.appendChild(this.elementGen("p", {"class" : "dialog-message"}, bodyText));
        const buttonCtn = this.elementGen("div", {"class" : "dialog-buttons"});
        buttonCtn.appendChild(this.elementGen("button", {"type" : "button", "class" : "dialog-button dialog-cancel-btn"}, "Cancel"));
        buttonCtn.appendChild(this.elementGen("button", {"type" : "button", "class" : "dialog-button dialog-save-btn"}, "Confirm"));
        dialogBody.appendChild(buttonCtn);
        dialogBox.appendChild(dialogBody);

        document.querySelector("body").appendChild(dialogOverlay)
    }

    alertDialog(title, bodyText) {

        this.removeElement("#alert-dlg-ovl");

        const dialogOverlay = this.renderDialogBox(title, "alert-dlg-ovl");
        const dialogBox = dialogOverlay.querySelector(".dialog-box");
        const dialogBody = this.elementGen("div",{"class" : "dialog-form"});
        dialogBody.appendChild(this.elementGen("p", {"class" : "dialog-message"}, bodyText));
        const buttonCtn = this.elementGen("div", {"class" : "dialog-buttons"});
        buttonCtn.appendChild(this.elementGen("button", {"type" : "button", "class" : "dialog-button dialog-save-btn"}, "Ok"));
        dialogBody.appendChild(buttonCtn);
        dialogBox.appendChild(dialogBody);

        document.querySelector("body").appendChild(dialogOverlay)
    }

    //Form Data Parsing
    taskFormData(formElement) {
        const inputs = formElement.querySelectorAll("input, textarea, select");
        const subtaskInputs = formElement.querySelectorAll("li[data-type='subtask']");
        const taskObj = {subTaskArr : []};
        const formTaskId = formElement.dataset.taskId;

        subtaskInputs.forEach((li) => {
            const [checkbox, description] = li.querySelectorAll("input");
            taskObj.subTaskArr.push({[checkbox.name] : checkbox.checked , [description.name] : description.value});
        });

        inputs.forEach(input => {
            if(input.dataset.dataTyp !== "sub-task") {
                taskObj[input.name] = input.value;
            }
        });
        
        if(formTaskId) {
            taskObj["taskID"] = formTaskId;
        }

        return taskObj;
    }


    initializeDisplay() {
        this.renderNavSidebar();
        this.renderTasksWindow();
    }

}