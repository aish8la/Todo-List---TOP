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
}