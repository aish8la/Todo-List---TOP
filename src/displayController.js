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
}