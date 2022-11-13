export class Task {
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

  increaseCounter() {
    this.#counter += 1;
    return this;
  }

  setName(newName) {
    this.#name = newName;
  }
}

