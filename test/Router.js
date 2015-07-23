/* eslint-disable no-reserved-keys */

import fs from "fs";
import path from "path";
import assert from "power-assert";
import sinon from "sinon";
import { Duplex } from "@mohayonao/dispatcher";
import { CHANGE_EVENT } from "../src/symbols";
import Router from "../src/Router";
import Action from "../src/Action";
import Store from "../src/Store";
import pkg from "../package";

describe("Router", () => {
  describe("constructor()", () => {
    it("works", () => {
      let router = new Router();

      assert(router instanceof Router);
      assert(router instanceof Duplex);
      assert(Array.isArray(router.actions));
      assert(Array.isArray(router.stores));
    });
  });
  describe("#delegate(address, data): void", () => {
    it("works", () => {
      let router = new Router();
      let data = { value: 100 };

      router.createAction = sinon.spy(router.createAction.bind(router));

      router.delegate("/update", data);

      assert(router.createAction.callCount === 1);
      assert(router.createAction.args[0][0] === "/update");
      assert(router.createAction.args[0][1] === data);
    });
  });
  describe("#getStateFromStores(): object", () => {
    it("works", () => {
      let router = new Router();

      assert.deepEqual(router.getStateFromStores(), {});
    });
  });
  describe("#createAction(address: string, data: object): void", () => {
    it("works", () => {
      let router = new Router();
      let action = new Action(router);
      let data = { value: 100 };

      router.actions.push(action);

      action["/commit"] = sinon.spy();
      action.commit = sinon.spy();

      router.createAction("/commit", data);
      router.createAction("commit", data);

      assert(action["/commit"].callCount === 1);
      assert(action["/commit"].args[0][0] === data);
      assert(action.commit.callCount === 0);
    });
  });
  describe("#addChangeListener(listener: function): void", () => {
    it("works", () => {
      let router = new Router();
      let listener = sinon.spy();

      router.addChangeListener(listener);

      assert(router.listeners(CHANGE_EVENT).indexOf(listener) !== -1);
    });
  });
  describe("#removeChangeListener(listener: function): void", () => {
    it("works", () => {
      let router = new Router();
      let listener = sinon.spy();

      router.addChangeListener(listener);
      router.removeChangeListener(listener);

      assert(router.listeners(CHANGE_EVENT).indexOf(listener) === -1);
    });
  });
  describe("example", () => {
    function versionStringToObject(value) {
      let values = value.split(".").map(x => x|0);

      return { major: values[0], minor: values[1], patch: values[2] };
    }

    class ReadFileAction extends Action {
      ["/readFile"]({ filepath }) {
        fs.readFile(path.join(__dirname, "..", filepath), (err, data) => {
          if (err) {
            return;
          }
          this.doneAction("/change/version", { value: JSON.parse(data).version });
          this.doneAction("change/version", { value: "1.2.3" });
        });
      }
    }

    class VersionStore extends Store {
      getInitialState() {
        return { major: 0, minor: 0, patch: 0 };
      }

      ["/change/version"]({ value }) {
        this.data = versionStringToObject(value);
        this.emitChange();
      }

      ["change/version"]() {
        throw new TypeError("NOT REACHED");
      }
    }

    class PackageStore extends Store {
      getInitialState() {
        return { version: "" };
      }

      ["/change/version"]({ value }) {
        this.data.version = value;
        this.emitChange();
      }

      ["change/version"]() {
        throw new TypeError("NOT REACHED");
      }
    }

    it("works", (done) => {
      let router = new Router();
      let action1 = new ReadFileAction(router);
      let action2 = {};
      let store1 = new VersionStore(router);
      let store2 = new PackageStore(router);
      let store3 = {};
      let listener = sinon.spy(() => {
        let state = router.getStateFromStores();

        assert.deepEqual(state, {
          version: versionStringToObject(pkg.version),
          package: {
            version: pkg.version,
          },
        });
      });

      router.actions.push(action1, action2);
      router.stores.push(store1, store2, store3);
      router.addChangeListener(listener);

      router.createAction("/readFile", { filepath: "package.json" });

      setTimeout(() => {
        assert(listener.callCount === 1);
        done();
      }, 10);
    });
  });
});
