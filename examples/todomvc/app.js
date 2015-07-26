import fluxx from "@mohayonao/fluxx";
import actions from "./actions";
import stores from "./stores";
import TodoApp from "./components/TodoApp";

function run() {
  let router = new fluxx.Router();

  router.actions = Object.keys(actions).map(name => new actions[name](router));
  router.stores = Object.keys(stores).map(name => new stores[name](router));

  React.render(
    React.createElement(TodoApp, { router }),
    document.getElementById("todoapp")
  );
}

export default { run };
