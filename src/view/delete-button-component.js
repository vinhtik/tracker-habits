import { AbstractComponent } from '../framework/view/abstact-component.js';

const createDeleteButtonTemplate = () => `
  <button type="button">Удалить</button>
`;

export class DeleteButtonComponent extends AbstractComponent {
  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createDeleteButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}