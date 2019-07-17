export class CustomElement extends HTMLElement {
    constructor() {
        super();

        const template = document.createElement('template');
        template.innerHTML = this.template;
        this.appendChild(template.content.cloneNode(true));
    }

    get template() {
        return '';
    }
}
