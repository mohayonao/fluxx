import { DONE_ACTION } from "./symbols";
import Router from "./Router";

export default class Action {
  constructor(router) {
    if (!(router instanceof Router)) {
      throw new TypeError("Action.constructor requires an instance of Router");
    }

    this.router = router;
  }

  doneAction(address, data) {
    this.router[DONE_ACTION](address, data);
  }
}
