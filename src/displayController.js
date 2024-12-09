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
}

export class MainDisplayElements extends DisplayRenderClass {

    constructor(taskViewObj) {
        super();
        this.taskViewObj = taskViewObj;
    }


    //Sidebar render
    renderNavSidebar() {


        // object containing node list like data for generating the DOM elements
        const elements = {
            tag: "div",
            attributes: { class: "nav-sidebar sidebar" },
            children: [
                {
                    tag: "button",
                    attributes: { class: "add-task-btn button" },
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
                            attributes: { class: "category-list no-decoration-list" },
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
                                    attributes: { class: "add-project-btn", type: "button" },
                                    content: "+",
                                },
                            ],
                        },
                        {
                            tag: "ul",
                            attributes: { class: "project-list no-decoration-list" },
                        },
                    ],
                },
            ],
        };

        this.displayContainer.appendChild(this.nodeGen(elements));
        this.renderSidebarMenuList();

    }

    renderSidebarMenuList() {

        const menuList = document.querySelector(".category-list");
        
        Object.keys(this.taskViewObj.navBarItems).forEach(key => {

            const list = this.elementGen("li", {"data-list-item": `list-${key}`}, key);
            menuList.appendChild(list);
        });
    }

    renderSidebarPrjList() {

        const projectSection = document.querySelector(".project-list");

        this.taskViewObj.projects.forEach(project => {

            const list = this.elementGen("li", {"data-prjct-name": `${project}`}, project);
            const button = this.elementGen("button", {class: "project-delete-btn", "data-prj-delete-btn": `${project}`});
            list.appendChild(button);
            projectSection.appendChild(list);
        });
    }

    //Main window render

    currentTaskView = "Upcoming";

    renderTasksWindow(viewType) {

        if(viewType) {
            this.currentTaskView = viewType;
        }

        const element = this.elementGen("div", {class: "content-space"});
        element.appendChild(this.elementGen("div", {class: "content-title", "data-current-view": `${this.currentTaskView}`}, this.currentTaskView));
        element.appendChild(this.elementGen("ul", {class: "task-list-ctn no-decoration-list"}));
        this.displayContainer.appendChild(element);

        this.renderTasklist();
    }


    renderTasklist() {

        const renderTaskList = this.taskViewObj.navBarItems[this.currentTaskView]();

        const contentSpace = document.querySelector(".content-space");

        renderTaskList.forEach(taskItem => {

            let formatDate = "";

            if(taskItem.dueDate) {
                formatDate = format(taskItem.dueDate, 'MMM do yy');
            }
            

            const listElm = this.elementGen("li", {class: "task-item", "data-elem-type": "task-li", "data-task-id": taskItem.taskID});
            const itmOne = this.elementGen("div", {class: "task-item-line-one task-item-line", "data-task-id": taskItem.taskID});
            itmOne.appendChild(this.elementGen("input", {"type" : "checkbox", class: "task-item-check-box", "data-task-id": taskItem.taskID}));
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
        attributes: {class: "form-container"},
        children: [
            {
                tag: "button",
                attributes: {class:"form-close-btn"},
                content: "\u2716",
            },
            {
                tag: "form",
                attributes: {"action":"", "method": "post", "class": "task-form"},
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
                                        attributes: {"class": "sub-task-btn", "type": "button"},
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
                                attributes: {"type" : "button", "class" : "form-button delete-task-btn"},
                                content: "Delete"
                            },
                            {
                                tag: "button",
                                attributes: {"type" : "submit", "class" : "form-button save-task-btn"},
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

        const formElm = this.nodeGen(this.formStrucure);

        if(taskID) {
            const currentTask = this.taskViewObj.findTaskByID(taskID);
            let formField;
    
            Object.entries(this.mapOfFormFields).forEach(([key, data]) => {
                formField = formElm.querySelector(`[name="${key}"]`);
                if(formField.type === "date") {
                    formField.value = format(currentTask[data], 'yyyy-MM-dd');
                } else {
                    formField.value = currentTask[data];
                }

                //TODO: ADD FUNCTION TO LOAD SUBTASKS WHEN ID IS ENTERED
          
            });
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

    addSubTaskRender() {
        const subTaskUL = document.querySelector("ul.sub-task-list-ctn");
        const subTaskList = this.elementGen("li", {"class" : "sub-task-item"});
        subTaskList.appendChild(this.elementGen("input", {"type" : "checkbox", "class" : "subtask-check-box"}));
        subTaskList.appendChild(this.elementGen("input", {"type" : "text", "class" : "subtask-item-title", "placeholder" : "Subtask"}));
        subTaskList.appendChild(this.elementGen("button", {"type" : "button", "class" : "sub-task-delete"}, "\u2716"));

        subTaskUL.appendChild(subTaskList);
    }

}