import { AbstractComponent } from '../framework/view/abstact-component.js';

const createFormTemplate = () => `
  <form id="habit-form">
      <label for="habit-name">Название привычки:</label>
      <input type="text" id="habit-name" placeholder="Например, Утренняя зарядка" required />
      
      <label for="habit-description">Описание:</label>
      <textarea id="habit-description" placeholder="Описание привычки" rows="3"></textarea>

      <label for="habit-status">Статус привычки:</label>
      <select id="habit-status" required>
          <option value="active">Активна</option>
          <option value="completed">Завершена</option>
      </select>

      <button type="submit">Добавить Привычку</button>
  </form>
`;

export class HabitFormComponent extends AbstractComponent {
  #handleSubmit = null;

  constructor({ onSubmit }) {
    super();
    this.#handleSubmit = onSubmit;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createFormTemplate();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const formData = this.#getFormData();
    this.#handleSubmit(formData);
    this.#resetForm();
  };

  #getFormData() {
    return {
      name: this.element.querySelector('#habit-name').value,
      description: this.element.querySelector('#habit-description').value,
      status: this.element.querySelector('#habit-status').value
    };
  }

   setFormData(data) {
    this.element.querySelector('#habit-name').value = data.name;
    this.element.querySelector('#habit-status').value = data.status;
    const submitButton = this.element.querySelector('button[type="submit"]');
    submitButton.textContent = data.id ? 'Обновить привычку' : 'Добавить привычку';
  }

  #resetForm() {
    this.element.reset();
  }
}