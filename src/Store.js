import { EMIT_CHANGE } from "./symbols";
import Router from "./Router";

export default class Store {
  constructor(router) {
    if (!(router instanceof Router)) {
      throw new TypeError("Store.constructor requires an instance of Router");
    }

    this.router = router;
    this.data = this.getInitialState();
  }

  get name() {
    return this.constructor.name;
  }

  getInitialState() {
    return {};
  }

  getState() {
    return this.data;
  }

  emitChange(force = false) {
    this.router[EMIT_CHANGE](force);
  }
}
