import TodoItem from "./TodoItem";

export default class MainSection extends React.Component {
  constructor(...args) {
    super(...args);

    this.$onToggleCompleteAll = this.$onToggleCompleteAll.bind(this);
  }

  render() {
    let { router, allTodos, areAllComplete } = this.props;

    if (Object.keys(allTodos).length < 1) {
      return null;
    }

    let todos = [];

    for (let key in allTodos) {
      todos.push(<TodoItem router={ router } key={ key } todo={ allTodos[key] } />);
    }

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={ this.$onToggleCompleteAll }
          checked={ areAllComplete ? "checked" : "" }
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{ todos }</ul>
      </section>
    );
  }

  $onToggleCompleteAll() {
    let { router } = this.props;

    router.createAction("/todo/toggle/completeAll");
  }
}
