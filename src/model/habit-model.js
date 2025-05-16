import { habits } from '../mock/habits.js';

export default class HabitModel {
    constructor() {
        this.habits = [...habits];
    }

    getAllHabits() {
        return this.habits;
    }

    getHabitsByStatus(status) {
        return status === 'all' 
            ? this.habits 
            : this.habits.filter(habit => habit.status === status);
    }

    getHabitById(id) {
        return this.habits.find(habit => habit.id === id);
    }

     updateHabit(id, newData) {
        const index = this.habits.findIndex(habit => habit.id === id);
        if (index !== -1) {
            this.habits[index] = { ...this.habits[index], ...newData };
        }
    }

    addHabit(habitData) {
        const newHabit = {
            ...habitData,
            id: Date.now().toString()
        };
        this.habits.push(newHabit);
        return newHabit;
    }

    deleteHabit(id) {
        this.habits = this.habits.filter(habit => habit.id !== id);
    }
}