class Task {
  #id;
  #name;
  #counter;
  constructor(name, counter = 0) {
    this.#id = Date.now().toString();
    this.#name = name;
    this.#counter = counter;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get counter() {
    return this.#counter;
  }

  addTask() {
    this.#counter += 1;
    return this;
  }

  setName(newName) {
    this.#name = newName;
  }
}

const task = new Task('wash the dishes', 5);
console.log('task  after creation: ', task);
console.log('task after adding a task: ', task.addTask());
task.id = 5; // никак не влияет
task.setName('nothing');
console.log('task in the end: ', task);
