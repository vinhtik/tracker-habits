import { AbstractComponent } from '../framework/view/abstact-component.js';

const createFilterTemplate = () => `
    <div class="habit-filter">
        <h2>Фильтры</h2>
        <label for="status-filter">Фильтр по статусу:</label>
        <select id="status-filter">
            <option value="all">Все</option>
            <option value="active">Активные</option>
            <option value="completed">Завершенные</option>
        </select>
    </div>
`;

export class HabitFilterComponent extends AbstractComponent {
  #handleFilterChange = null;

  constructor({ onFilterChange }) {
    super();
    this.#handleFilterChange = onFilterChange;
    this.element.addEventListener('change', this.#filterChangeHandler);
  }

  get template() {
    return createFilterTemplate();
  }

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterChange(evt.target.value);
  };
}