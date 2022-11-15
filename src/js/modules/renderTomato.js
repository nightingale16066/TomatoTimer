/* eslint-disable max-len */
import {el, setChildren} from 'redom';
import tomatoImg from '../../img/svg/noto_tomato.svg';

export class RenderTomato {
  constructor(app) {
    this.app = app; // app - body
    this.init();
  }

  init() {
    const header = this.renderHeader();
    const modal = this.renderModal();
    this.main = this.renderMain();
    this.app.append(header, this.main, modal);
  }

  get modal() {
    return this.app.querySelector('.modal-overlay');
  }

  renderMain() {
    const formWindow = this.renderFormWindow();
    const tasks = this.renderPomodoroTasks();

    const main = el('main', el('section.main', el('.container.main__container', [formWindow, tasks])));
    return main;
  }

  renderPopUp() {
    const popUp = el('.burger-popup.burger-popup_active', [
      el('button.popup-button.burger-popup__edit-button', 'Редактировать'),
      el('button.popup-button.burger-popup__delete-button', 'Удалить'),
    ]);
    return popUp;
  }

  renderTask(task) {
    const taskItem = el(`li.pomodoro-tasks__list-task.${task.importance}`, {'data-id': `${task.id}`}, [
      el('span.count-number', `${task.counter}`),
      // .pomodoro-tasks__task-text_active
      el('button.pomodoro-tasks__task-text', `${task.name}`),
      el('button.pomodoro-tasks__task-button', {'data-id-list': `${task.id}`}),
      el('.burger-popup', [
        el('button.popup-button.burger-popup__edit-button', 'Редактировать'),
        el('button.popup-button.burger-popup__delete-button', 'Удалить'),
      ]),
    ]);
    return taskItem;
  }

  renderInstructions() {
    const header = el('p.pomodoro-tasks__header-title', 'Инструкция:');
    const questList = el('ul.pomodoro-tasks__quest-list', [
      el('li.pomodoro-tasks__list-item', 'Напишите название задачи чтобы её добавить'),
      el('li.pomodoro-tasks__list-item', 'Чтобы задачу активировать, выберите её из списка'),
      el('li.pomodoro-tasks__list-item', 'Запустите таймер'),
      el('li.pomodoro-tasks__list-item', 'Работайте пока таймер не прозвонит'),
      el('li.pomodoro-tasks__list-item', 'Сделайте короткий перерыв (5 минут)'),
      el('li.pomodoro-tasks__list-item', 'Продолжайте работать, пока задача не будет выполнена.'),
      el('li.pomodoro-tasks__list-item', 'Каждые 4 периода таймера делайте длинный перерыв (15-20 минут).'),
    ]);
    return [header, questList];
  }

  renderTaskList(taskList) {
    this.list = el('ul.pomodoro-tasks__quest-tasks');
    return this.list;
  }

  renderPomodoroTasks() {
    const pomodoroTasks = el('.pomodoro-tasks');
    const totalTime = el('p.pomodoro-tasks__deadline-timer', '1 час 30 мин');
    setChildren(pomodoroTasks, ...this.renderInstructions(), this.renderTaskList(), totalTime);
    return pomodoroTasks;
  }

  renderFormWindow() {
    const formWindow = el('.pomodoro-form.window', [
      el('.window__panel', [
        el('p.window__panel-title', 'Выберите задачу'),
        el('p.window__panel-task-text', 'Томат 2'),
      ]),
      el('.window__body', [
        el('p.window__timer-text', {style: 'display:flex;'}, [
          el('.minutes', '25'),
          el('.separator', ':'),
          el('.seconds', '00'),
        ]),
        el('.window__buttons', [
          el('button.button.button-primary', 'Старт'),
          el('button.button.button-secondary', 'Стоп'),
        ]),
      ]),
      el('form.task-form', {action: 'submit'}, [

        el('input.task-name.input-primary', {type: 'text', name: 'task-name', id: 'task-name', placeholder: 'название задачи'}),

        el('button.button.button-importance.default', {'type': 'button', 'aria-label': 'Указать важность'}),
        el('button.button.button-primary.task-form__add-button', 'Добавить', {type: 'submit'}),
      ]),
    ]);
    return formWindow;
  }

  removeFromActive(task) {
    console.log('task: ', task);
    task.classList.remove('pomodoro-tasks__task-text_active');
  }

  renderHeader() {
    const header = el('header',
        el('section.header',
            el('.container.header__container',
                el('img.header__logo', {src: tomatoImg, alt: 'Tomato image'}),
                el('h1.header__title', 'Tomato timer'),
            ),
        ),
    );
    return header;
  }

  renderModal() {
    const modalOverlay = el('.modal-overlay',
        el('.modal-delete', [
          el('p.modal-delete__title', 'Удалить задачу?'),
          el('button.modal-delete__close-button'),
          el('button.modal-delete__delete-button.button-primary', 'Удалить'),
          el('button.modal-delete__cancel-button', 'Отмена'),
        ]),
    );
    return modalOverlay;
  }

  setModal() {
    this.modal.classList.add('modal-active');
  }

  deleteModal() {
    this.modal.classList.remove('modal-active');
  }

  updateTime(minutes, seconds) {
    const minutesSector = document.querySelector('.minutes');
    const secondsSector = document.querySelector('.seconds');

    minutesSector.textContent = minutes;
    secondsSector.textContent = seconds;
  }

  deleteTaskItem(id) {
    const taskItem = document.querySelector(`[data-id="${id}"]`);
    if (!taskItem) return;
    taskItem.remove();
    this.deleteModal();
  }

  addTaskToActive(task) {
    console.log('task: ', task);
    const windowTitle = document.querySelector('.window__panel-title');
    const windowTaskText = document.querySelector('.window__panel-task-text');
    const taskText = document.querySelector(`[data-id="${task.id}"] .pomodoro-tasks__task-text`);
    console.log('taskText: ', taskText);


    taskText.classList.add('pomodoro-tasks__task-text_active');
    windowTitle.textContent = task.name;
    windowTaskText.textContent = `Томат ${task.counter}`;
  }

  setTitledefault() {
    const windowTitle = document.querySelector('.window__panel-title');
    windowTitle.textContent = 'Выберите задачу';
  }

  addTaskToList(task) {
    this.list.append(this.renderTask(task));
  }

  increaseCounter(id, taskCount) {
    const currItem = document.querySelector(`[data-id="${id}"]`);
    const count = currItem.querySelector('.count-number');
    count.textContent = taskCount;
  }
}
