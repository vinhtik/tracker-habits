import HabitModel from './model/habit-model.js';
import { HabitPresenter } from './presenter/habit-presenter.js';

document.addEventListener('DOMContentLoaded', () => {
  const model = new HabitModel();
  const appContainer = document.querySelector('.container');
  
  new HabitPresenter({
    model,
    container: appContainer
  });
});