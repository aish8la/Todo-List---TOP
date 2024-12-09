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

    renderNavSidebar() {

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
                            children: [
                                { tag: "li", content: "Today" },
                                { tag: "li", content: "Upcoming" },
                            ],
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
    }
}