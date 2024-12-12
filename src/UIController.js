export class UIControllerClass {

    constructor(dataObj,displayObj) {
        this.displayObj = displayObj;
        this.dataObj = dataObj;
        }

    //Sidebar click event handlers


    //Initialize the whole app

    initializeApp(defaultData) {
        this.dataObj.initializeData(defaultData);
        this.displayObj.initializeDisplay();
    }

    }