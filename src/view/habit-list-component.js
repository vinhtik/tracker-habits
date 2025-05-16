import { AbstractComponent } from '../framework/view/abstact-component.js';

const createListTemplate = () => `
  <div class="habit-list">
    <h2>Список привычек</h2>
    <div id="habit-list"></div>
  </div>
`;

export class HabitListComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return createListTemplate();
  }

  get listElement() {
    return this.element.querySelector('.habit-list');
  }
}