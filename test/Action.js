import assert from "power-assert";
import sinon from "sinon";
import { DONE_ACTION } from "../src/symbols";
import Router from "../src/Router";
import Action from "../src/Action";

describe("Action", () => {
  let router;

  beforeEach(() => {
    router = new Router();
  });

  describe("constructor(router: Router)", () => {
    it("works", () => {
      let action = new Action(router);

      assert(action instanceof Action);
    });
    it("fails", () => {
      assert.throws(() => {
        return new Action();
      }, TypeError);
    });
  });
  describe("#doneAction(address: string, data: any): void", () => {
    it("works", () => {
      let action = new Action(router);
      let data = {};

      router[DONE_ACTION] = sinon.spy(router[DONE_ACTION].bind(router));

      action.doneAction("/commit", data);

      assert(router[DONE_ACTION].callCount === 1);
      assert(router[DONE_ACTION].args[0][0] === "/commit");
      assert(router[DONE_ACTION].args[0][1] === data);
    });
  });
});
