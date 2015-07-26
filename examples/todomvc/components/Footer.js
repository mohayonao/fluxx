export default class Footer extends React.Component {
  constructor(...args) {
    super(...args);

    this.$onClearCompletedClick = this.$onClearCompletedClick.bind(this);
  }

  render() {
    let { allTodos } = this.props;
    let total = Object.keys(allTodos).length;

    if (total === 0) {
      return null;
    }

    let completed = 0;

    for (let key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    let itemsLeft = total - completed;
    let itemsLeftPhrase = itemsLeft === 1 ? " item " : " items ";

    itemsLeftPhrase += "left";

    // Undefined and thus not rendered if no completed items are left.
    let clearCompletedButton;

    if (completed) {
      clearCompletedButton = (
        <button
          id="clear-completed"
          onClick={ this.$onClearCompletedClick }>
          Clear completed ({ completed })
        </button>
      );
    }

  	return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            { itemsLeft }
          </strong>
          { itemsLeftPhrase }
        </span>
        { clearCompletedButton }
      </footer>
    );
  }

  $onClearCompletedClick() {
    let { router } = this.props;

    router.createAction("/todo/destroy/completed");
  }
}
