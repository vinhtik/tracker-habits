import { createElement } from '../render.js';

export class AbstractComponent {
    #element = null;

    constructor() {
        if (new.target === AbstractComponent) {
            throw new Error('Can\'t instantiate AbstractComponent, only concrete one.');
        }
    }

    get element() {
        if (!this.#element) {
            this.#element = createElement(this.template);
        }
        return this.#element;
    }

    get template() {
        throw new Error('Abstract method not implemented: get template');
    }

    setFormData(data) {
    this.element.querySelector('#habit-name').value = data.title;
    this.element.querySelector('#habit-description').value = data.description;
    this.element.querySelector('#habit-status').value = data.status;
  }

    removeElement() {
        this.#element = null;
    }
}