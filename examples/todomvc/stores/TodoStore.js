import fluxx from "@mohayonao/fluxx";
import assign from "object-assign";

export default class TodoStore extends fluxx.Store {
  constructor(...args) {
    super(...args);

    this.todos = {};
  }

  getInitialState() {
    return {
      allTodos: this.todos,
      areAllComplete: [],
    };
  }

  getState() {
    this.data.allTodos = this.todos;
    this.data.areAllComplete = this.areAllComplete();

    return this.data;
  }

  ["/todo/create"]({ text }) {
    text = text.trim();

    if (text !== "") {
      this.create(text);
      this.emitChange();
    }
  }

  ["/todo/update/text"]({ id, text }) {
    text = text.trim();

    if (text !== "") {
      this.update(id, { text });
      this.emitChange();
    }
  }

  ["/todo/complete"]({ id }) {
    this.update(id, { complete: true });
    this.emitChange();
  }

  ["/todo/undo/complete"]({ id }) {
    this.update(id, { complete: false });
    this.emitChange();
  }

  ["/todo/toggle/completeAll"]() {
    if (this.areAllComplete()) {
      this.updateAll({ complete: false });
    } else {
      this.updateAll({ complete: true });
    }
    this.emitChange();
  }

  ["/todo/destroy"]({ id }) {
    this.destroy(id);
    this.emitChange();
  }

  ["/todo/destroy/completed"]() {
    this.destroyCompleted();
    this.emitChange();
  }

  create(text) {
    let id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

    this.todos[id] = { id, text, complete: false };
  }

  update(id, updates) {
    this.todos[id] = assign({}, this.todos[id], updates);
  }

  updateAll(updates) {
    for (let id in this.todos) {
      this.update(id, updates);
    }
  }

  destroy(id) {
    delete this.todos[id];
  }

  destroyCompleted() {
    for (let id in this.todos) {
      if (this.todos[id].complete) {
        this.destroy(id);
      }
    }
  }

  areAllComplete() {
    for (let id in this.todos) {
      if (!this.todos[id].complete) {
        return false;
      }
    }
    return true;
  }
}
