/* eslint-disable max-len */
export class ConrollerTomato {
  #taskList = document.querySelector('.pomodoro-tasks__quest-tasks');
  minutesSector = document.querySelector('.minutes');
  secondsSector = document.querySelector('.seconds');
  isRunning = false;
  isSession = true;
  isPauseTime = false;
  restTime = 0;

  #timerId = 0;

  constructor(tomatoTimer, render) {
    this.tomatoTimer = tomatoTimer;
    this.render = render;
    this.addTaskFromForm();
    this.showPopUp();
    this.chooseActiveTask();
    this.activateTask();
  }

  activateTask() {
    const buttons = document.querySelector('.window__buttons');
    buttons.addEventListener('click', e => {
      if (e.target.closest('.button-primary') && this.tomatoTimer.activeTask && !this.isRunning) {
        this.isRunning = true;
        this.restTime ? this.setTimer(this.restTime) : this.setTimer(this.tomatoTimer.taskTime);
      }
      if (e.target.closest('.button-secondary') && this.isRunning) {
        clearInterval(this.#timerId);
        this.isRunning = false;
      }
    });
  }

  countMin(time) {
    return Math.floor(time / 60).toString().padStart(2, '0');
  }

  countSec(time) {
    return Math.floor(time % 60).toString().padStart(2, '0');
  }

  setTimer(counterValue) {
    this.#timerId = setInterval(() => {
      // const initialTime = counterValue;
      this.restTime = --counterValue;
      const min = this.countMin(this.restTime);
      const sec = this.countSec(this.restTime);

      this.render.updateTime(min, sec);

      if (!this.tomatoTimer.activeTask) {
        clearInterval(this.#timerId);
        this.render.updateTime(this.countMin(this.tomatoTimer.taskTime), this.countSec(this.tomatoTimer.taskTime));
        this.restTime = 0;
        this.isPauseTime = false;
        return;
      }

      if (this.restTime === 0 && !this.isPauseTime) {
        clearInterval(this.#timerId);
        this.tomatoTimer.activeTask.increaseCounter();
        this.render.increaseCounter(this.tomatoTimer.activeTask.id, this.tomatoTimer.activeTask.counter);

        if (!(this.tomatoTimer.activeTask.counter % 3) && this.tomatoTimer.activeTask.counter !== 0) {
          this.setTimer(this.tomatoTimer.bigPause);
          this.isPauseTime = true;
          return;
        } else {
          this.setTimer(this.tomatoTimer.pauseTime);
          this.isPauseTime = true;
          return;
        }
      }
      if (this.restTime === 0 && this.isPauseTime) {
        clearInterval(this.#timerId);
        this.isPauseTime = false;
        this.setTimer(this.tomatoTimer.taskTime);
        return;
      }
    }, 1000);
  }

  addTaskFromForm() {
    const form = document.querySelector('.task-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const importanceBtn = document
          .querySelector('[aria-label="Указать важность"]');
      const importance = importanceBtn.className.split(' ')[2];
      const taskName = document.querySelector('.task-name');

      if (!taskName.value) return;

      const newTask = this.tomatoTimer.createTask(importance, taskName.value);
      this.render.addTaskToList(newTask);

      taskName.value = '';
      importanceBtn.className = 'button button-importance default';
    });
  }

  showPopUp() {
    this.#taskList.addEventListener('click', (e) => {
      if (e.target.closest('.pomodoro-tasks__task-button')) {
        const listItem = e.target.closest('.pomodoro-tasks__list-task');
        const popUpBtn = listItem.querySelector('.burger-popup');
        popUpBtn.classList.toggle('burger-popup_active');

        if (popUpBtn.className.includes('burger-popup_active')) {
          this.deleteOrEditTask(popUpBtn);
        }
      }
    });
  }

  deleteOrEditTask(popUp) {
    popUp.addEventListener('click', e => {
      const controller = new AbortController();

      const taskItem = e.target.closest('.pomodoro-tasks__list-task');
      if (e.target.closest('.burger-popup__delete-button')) {
        popUp.classList.remove('burger-popup_active');
        this.render.setModal();
        this.confirmModal(taskItem.dataset.id, controller);
      } else if (e.target.closest('.burger-popup__edit-button')) {
        popUp.classList.remove('burger-popup_active');
        this.deleteTaskFromActive(taskItem.dataset.id);
      }
    });
  }

  confirmModal(id, controller) {
    this.render.modal.addEventListener('click', e => {
      if (e.target.closest('.modal-delete__close-button') ||
        e.target.closest('.modal-delete__cancel-button') ||
        e.target.closest('.modal-overlay') && !e.target.closest('.modal-delete')) {
        this.render.deleteModal();
        controller.abort();
      }
      if (e.target.closest('.modal-delete__delete-button')) {
        if (id === this.tomatoTimer.activeTask?.id) this.render.setTitledefault();
        this.tomatoTimer.deleteTask(id);
        this.render.deleteTaskItem(id);
        this.isRunning = false;
        this.restTime = 0;
        controller.abort();
      }
    }, {signal: controller.signal});
  }

  deleteTaskFromActive(id) {
    const task = this.#taskList.querySelector(`[data-id="${id}"] .pomodoro-tasks__task-text`);
    this.render.removeFromActive(task);
    this.render.setTitledefault();
    this.tomatoTimer.deleteFromActive();
    this.isRunning = false;
    this.restTime = 0;
  }

  chooseActiveTask() {
    this.#taskList.addEventListener('click', (e) => {
      const controller = new AbortController();
      if (e.target.closest('.pomodoro-tasks__task-text')) {
        const taskItem = e.target.closest('.pomodoro-tasks__list-task');
        const taskId = taskItem.dataset.id;
        this.tomatoTimer.activateTask(taskId);
        this.render.addTaskToActive(this.tomatoTimer.activeTask);
        controller.abort();
      }
    });
  }
}
