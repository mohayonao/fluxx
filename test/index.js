import assert from "power-assert";
import fluxx from "../src";
import Router from "../src/Router";
import Action from "../src/Action";
import Store from "../src/Store";

describe("fluxx", () => {
  describe("exports", () => {
    it("works", () => {
      assert(fluxx.Router === Router);
      assert(fluxx.Action === Action);
      assert(fluxx.Store === Store);
    });
  });
});
