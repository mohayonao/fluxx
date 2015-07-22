import assert from "power-assert";
import sinon from "sinon";
import { Delegator } from "@mohayonao/dispatcher";
import { EMIT_CHANGE } from "../src/symbols";
import Router from "../src/Router";
import Store from "../src/Store";

describe("Store", () => {
  let router;

  beforeEach(() => {
    router = new Router();
  });

  describe("constructor(router: Router)", () => {
    it("works", () => {
      let store = new Store(router);

      assert(store instanceof Store);
      assert(store instanceof Delegator);
    });
    it("fails", () => {
      assert.throws(() => {
        return new Store();
      }, TypeError);
    });
  });
  describe("#name: string", () => {
    it("works", () => {
      let store = new Store(router);

      assert(store.name === "Store");
    });
  });
  describe("#getInitialState(): object", () => {
    it("works", () => {
      let store = new Store(router);

      assert.deepEqual(store.getInitialState(), {});
    });
  });
  describe("#getState(): object", () => {
    it("works", () => {
      let store = new Store(router);

      assert(store.getState() === store.data);
    });
  });
  describe("#emitChange(force: boolean = false)", () => {
    it("works", () => {
      let store = new Store(router);

      router[EMIT_CHANGE] = sinon.spy(router[EMIT_CHANGE].bind(router));

      store.emitChange(true);

      assert(router[EMIT_CHANGE].callCount === 1);
      assert(router[EMIT_CHANGE].args[0][0] === true);
    });
  });
});
