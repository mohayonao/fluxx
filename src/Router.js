import { Duplex } from "@mohayonao/dispatcher";
import { LOCKED, CHANGE_EVENT, EMIT_CHANGE, DONE_ACTION } from "./symbols";

export default class Router extends Duplex {
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
        if (typeof action.delegate === "function") {
          action.delegate(address, data);
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
        if (typeof store.delegate === "function") {
          store.delegate(address, data);
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
