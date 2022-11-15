import {ImportantTask, CommonTask, UnimportantTask} from './task';

export class Tomato {
  #taskTime;
  #pauseTime;
  #bigPause;
  #taskList;
  #activeTask = null;

  get taskTime() {
    return this.#taskTime;
  }
  get pauseTime() {
    return this.#pauseTime;
  }
  get bigPause() {
    return this.#bigPause;
  }
  get taskList() {
    return this.#taskList;
  }
  get activeTask() {
    return this.#activeTask;
  }

  // eslint-disable-next-line max-len
  constructor({taskTime = 25, pauseTime = 5, bigPause = 15, taskList = []} = {}) {
    if (Tomato._instance) {
      return Tomato._instance;
    }
    this.#taskTime = taskTime;
    this.#pauseTime = pauseTime;
    this.#bigPause = bigPause;
    this.#taskList = taskList;
    Tomato._instance = this;
  }

  createTask(importance, taskName) {
    // eslint-disable-next-line max-len
    const Task = importance === 'important' ? ImportantTask : importance === 'so-so' ? CommonTask : UnimportantTask;
    const task = new Task(taskName);
    this.addTask(task);
    return task;
  }

  addTask(task) {
    this.#taskList.push(task);
  }

  activateTask(id) {
    if (this.#activeTask) return;
    const curTask = this.#taskList.find(task => task.id === id);
    this.#activeTask = curTask;
    console.log('this.#activeTask: ', this.#activeTask);
  }

  deleteFromActive() {
    this.#activeTask = null;
  }

  deleteTask(id) {
    console.log(id === this.#activeTask?.id);
    if (id === this.#activeTask?.id) this.#activeTask = null;
    this.#taskList = this.#taskList.filter(item => item.id !== id);
  }

  setTimeForTask() {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`solved task ${this.#activeTask.name}`);
        resolve();
      }, this.#taskTime * 1000);
    });
  }

  haveRest(pause) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`had a rest for ${pause}`);
        resolve();
      }, pause * 1000);
    });
  }

  async runTask() {
    try {
      if (!this.#activeTask) throw new Error('There is no active task');

      while (true) {
        console.log('start doing active task');
        await this.setTimeForTask();

        if (!(this.#activeTask.counter % 3) && this.#activeTask.counter !== 0) {
          console.log('big rest time');
          await this.haveRest(this.#bigPause);
        } else {
          console.log('small rest time');
          await this.haveRest(this.#pauseTime);
        }
        this.#activeTask.increaseCounter();
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  increaseCounterOnTask(id) {
    this.#taskList.find(task => task.id === id).increaseCounter();
  }
}
