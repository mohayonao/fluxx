import TodoTextInput from "./TodoTextInput";

function cx(classNames) {
  return Object.keys(classNames).filter(name => classNames[name]).join(" ");
}

export default class TodoItem extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { isEditing: false };

    this.$onToggleComplete = this.$onToggleComplete.bind(this);
    this.$onDoubleClick = this.$onDoubleClick.bind(this);
    this.$onSave = this.$onSave.bind(this);
    this.$onDestroyClick = this.$onDestroyClick.bind(this);
  }

  render() {
    let { router, todo } = this.props;
    let input;

    if (this.state.isEditing) {
      input = (
        <TodoTextInput
          router={ router }
          className="edit"
          onSave={ this.$onSave }
          value={ todo.text }
        />);
    }

    return (
      <li
        className={cx({
          completed: todo.complete,
          editing: this.state.isEditing
        })}
        key={ todo.id }>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={ todo.complete }
            onChange={ this.$onToggleComplete }
          />
          <label onDoubleClick={ this.$onDoubleClick }>
            { todo.text }
          </label>
          <button className="destroy" onClick={ this.$onDestroyClick } />
        </div>
        { input }
      </li>
    );
  }

  $onToggleComplete() {
    let { router, todo } = this.props;

    router.createAction("/todo/toggle/complete", todo);
  }

  $onDoubleClick() {
    this.setState({ isEditing: true });
  }

  $onSave(text) {
    let { router, todo } = this.props;

    router.createAction("/todo/update/text", { id: todo.id, text });
    this.setState({ isEditing: false });
  }

  $onDestroyClick() {
    let { router, todo } = this.props;

    router.createAction("/todo/destroy", { id: todo.id });
  }
}
