export class UIControllerClass {
    // Temporary Event Listeners
    constructor() {
        this.form = document.querySelector("form.task-form");
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            const inputs = this.form.querySelectorAll('input');
            const due = inputs[1].value;
            console.log(`selected time: ${due}`);
            console.log(`in local time: ${new Date(due)}`);
            console.log(`in UTC time: ${new Date(due).toISOString()}`);
        });
    }
}