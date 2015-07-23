import EventEmitter from "@mohayonao/event-emitter";
import { LOCKED, CHANGE_EVENT, EMIT_CHANGE, DONE_ACTION } from "./symbols";

const setImmediate = global.setImmediate || function(callback) {
  setTimeout(callback, 0);
};

export default class Router extends EventEmitter {
  constructor() {
    super();

    this.actions = [];
    this.stores = [];
    this[LOCKED] = false;
  }

  delegate(address, data) {
    this.createAction(address, data);
  }

  getStateFromStores() {
    let state = {};

    this.stores.forEach((store) => {
      let name = (store.name || "").replace(/Store$/, "");

      name = name.charAt(0).toLowerCase() + name.substr(1);

      if (typeof store.getState === "function") {
        state[name] = store.getState();
      }
    });

    return state;
  }

  createAction(address, data) {
    if (typeof address === "string" && address[0] === "/") {
      this.actions.forEach((action) => {
        if (typeof action[address] === "function") {
          action[address](data);
        }
      });
    }
  }

  addChangeListener(listener) {
    this.on(CHANGE_EVENT, listener);
  }

  removeChangeListener(listener) {
    this.removeListener(CHANGE_EVENT, listener);
  }

  [DONE_ACTION](address, data) {
    if (typeof address === "string" && address[0] === "/") {
      this.stores.forEach((store) => {
        if (typeof store[address] === "function") {
          store[address](data);
        }
      });
    }
  }

  [EMIT_CHANGE](force) {
    if (force || !this[LOCKED]) {
      this[LOCKED] = true;
      setImmediate(() => {
        this.emit(CHANGE_EVENT);
        this[LOCKED] = false;
      });
    }
  }
}
