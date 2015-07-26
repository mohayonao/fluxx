import fluxx from "@mohayonao/fluxx";

export default class TodoAction extends fluxx.Action {
  ["/todo/create"]({ text }) {
    this.doneAction("/todo/create", { text });
  }

  ["/todo/update/text"]({ id, text }) {
    this.doneAction("/doto/update/text", { id, text });
  }

  ["/todo/toggle/complete"]({ id, complete }) {
    let actionType = complete ? "/todo/undo/complete" : "/todo/complete";

    this.doneAction(actionType, { id });
  }

  ["/todo/toggle/completeAll"]() {
    this.doneAction("/todo/toggle/completeAll");
  }

  ["/todo/destroy"]({ id }) {
    this.doneAction("/todo/destroy", { id });
  }

  ["/todo/destroy/completed"]() {
    this.doneAction("/todo/destroy/completed");
  }
}
