import {Task} from './modules/task';
import {Tomato} from './modules/tomato';

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

const tomatoTimer = new Tomato();
console.log('initial tomatoTimer: ', tomatoTimer);

const task1 = new Task('learn RegExp');
const task2 = new Task('feed the cat');

tomatoTimer.addTask(task1);
tomatoTimer.addTask(task2);
console.log('add task to tomatoTimer: ', tomatoTimer);

tomatoTimer.activateTask(task1.id);
console.log('after activating tomatoTimer: ', tomatoTimer);
tomatoTimer.runTask();

