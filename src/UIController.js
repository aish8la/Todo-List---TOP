export class UIControllerClass {
    // Temporary Event Listeners
    constructor() {
        this.form = document.querySelector("form.task-form");
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            const inputs = this.form.querySelectorAll('input');
            console.log(inputs);
        });
    }
}