import { AbstractComponent } from '../framework/view/abstact-component.js';

const createBookItemTemplate = (habit) => `
  <div class="habit-item" data-id="${habit.id}">
    <div class="habit-info">
      <h3>${habit.name}</h3>
      <p>${habit.status}</p>
    </div>
    <div class="habit-actions" data-actions></div>
  </div>
`;

export class HabitItemComponent extends AbstractComponent {
  #habit = null;

  constructor({ habit }) {
    super();
    this.#habit = habit;
  }

  get template() {
    return createBookItemTemplate(this.#habit);
  }

}