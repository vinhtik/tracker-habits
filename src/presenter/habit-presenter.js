import { render } from '../framework/render.js';
import { HabitFilterComponent } from '../view/habit-filter-component.js';
import { HabitFormComponent } from '../view/habit-form-component.js';
import { HabitItemComponent } from '../view/habit-item-component.js';
import { HabitListComponent } from '../view/habit-list-component.js';
import { DeleteButtonComponent } from '../view/delete-button-component.js';
import HabitModel from '../model/habit-model.js';
import { ChangeButtonComponent } from '../view/change-button-component.js';

export class HabitPresenter {
  #model = null;
  #container = null;
  #filterComponent = null;
  #formComponent = null;
  #listComponent = null;
  #habitItemComponents = [];
  #editingHabitId = null; 

  constructor({ model, container }) {
    this.#model = model;
    this.#container = container;
    this.#init();
  }

  #init() {
    this.#renderComponents();
    this.#updateHabitList();
  }

  #renderComponents() {
    this.#listComponent = new HabitListComponent();
    render(this.#listComponent, this.#container.querySelector('.habit-list'));

    this.#filterComponent = new HabitFilterComponent({
      onFilterChange: this.#handleFilterChange.bind(this)
    });
    render(this.#filterComponent, this.#container.querySelector('.habit-filter'));

    this.#formComponent = new HabitFormComponent({
      onSubmit: this.#handleFormSubmit.bind(this)
    });
    render(this.#formComponent, this.#container.querySelector('.habit-form'));

  }

  #renderHabits(habits) {
    const listElement = this.#listComponent.element;
    listElement.innerHTML = '';
    this.#habitItemComponents = [];

    habits.forEach(habit => {
      const habitItemComponent = new HabitItemComponent({ habit });
      const habitElement = habitItemComponent.element;
      listElement.appendChild(habitElement);

      const deleteButtonComponent = new DeleteButtonComponent({
        onClick: () => this.#handleDeleteBook(habit.id)
      });
      render(deleteButtonComponent, habitItemComponent.element);
      const editButtonComponent = new ChangeButtonComponent({
        onClick: () => this.#handleEditHabit(habit.id) 
      });
      render(editButtonComponent, habitItemComponent.element);


      this.#habitItemComponents.push({
        bookItem: habitItemComponent,
        deleteButton: deleteButtonComponent,
        editButton: editButtonComponent
      });
    });
  }

 #handleFormSubmit(formData) {
    if (this.#editingHabitId) {
      this.#model.updateHabit(this.#editingHabitId, formData);
      this.#editingHabitId = null; 
    } else {
      this.#model.addHabit(formData);
    }
    this.#updateHabitList();
  }

  #handleDeleteBook(habitId) {
    this.#model.deleteHabit(habitId);
    this.#updateHabitList();
  }

  #handleFilterChange(status) {
    this.#updateHabitList(status);
  }

  #updateHabitList(status = 'all') {
    const habits = this.#model.getHabitsByStatus(status);
    this.#renderHabits(habits);
  }

 #handleEditHabit(habitId) {
    this.#editingHabitId = habitId;
    const habit = this.#model.getHabitById(habitId);
    this.#formComponent.setFormData(habit);
  }
}