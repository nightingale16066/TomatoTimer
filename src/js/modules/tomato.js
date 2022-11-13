export class Tomato {
  #taskTime;
  #pauseTime;
  #bigPause;
  #taskList;
  #activeTask = null;

  // eslint-disable-next-line max-len
  constructor({taskTime = 25, pauseTime = 5, bigPause = 15, taskList = []} = {}) {
    this.#taskTime = taskTime;
    this.#pauseTime = pauseTime;
    this.#bigPause = bigPause;
    this.#taskList = taskList;
  }

  addTask(task) {
    this.#taskList.push(task);
  }

  activateTask(id) {
    const curTask = this.#taskList.find(task => task.id === id);
    this.#activeTask = curTask;
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
