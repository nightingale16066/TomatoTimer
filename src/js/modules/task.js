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

export class ImportantTask extends Task {
  importance = 'important';

  constructor(name, counter = 0) {
    super(name, counter);
  }
}

export class CommonTask extends Task {
  importance = 'so-so';

  constructor(name, counter = 0) {
    super(name, counter);
  }
}

export class UnimportantTask extends Task {
  importance = 'default';

  constructor(name, counter = 0) {
    super(name, counter);
  }
}


