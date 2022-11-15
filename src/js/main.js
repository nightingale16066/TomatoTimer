import {ConrollerTomato} from './modules/conrollerTomato';
import {RenderTomato} from './modules/renderTomato';
import {Tomato} from './modules/tomato';

const tomatoTimer = new Tomato();
const render = new RenderTomato(document.querySelector('body'));

// eslint-disable-next-line no-unused-vars
const controller = new ConrollerTomato(tomatoTimer, render);

let count = 0;
const imp = ['default', 'important', 'so-so'];
// eslint-disable-next-line max-len
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
  count += 1;
  if (count >= imp.length) {
    count = 0;
  }

  for (let i = 0; i < imp.length; i++) {
    if (count === i) {
      target.classList.add(imp[i]);
    } else {
      target.classList.remove(imp[i]);
    }
  }
});


// console.log('initial tomatoTimer: ', tomatoTimer);


// const task1 = new Task('learn RegExp');
// console.log('task1: ', task1);
// const task2 = new Task('feed the cat');
// console.log('task2: ', task2);
// const task3 = new ImportantTask('find solution for 4.5');
// task3.increaseCounter();
// task3.setName('mop the floor');
// console.log('task3: ', task3);

// tomatoTimer.addTask(task1);
// tomatoTimer.addTask(task2);
// console.log('add task to tomatoTimer: ', tomatoTimer);

// eslint-disable-next-line no-unused-vars

// tomatoTimer.activateTask(task1.id);
// console.log('after activating tomatoTimer: ', tomatoTimer);
// tomatoTimer.runTask();

