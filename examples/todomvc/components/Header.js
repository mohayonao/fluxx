import TodoTextInput from "./TodoTextInput";

export default class Header extends React.Component {
  constructor(...args) {
    super(...args);

    this.$onSave = this.$onSave.bind(this);
  }

  render() {
    let { router } = this.props;

    return (
      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          router={ router }
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={ this.$onSave }
        />
      </header>
    );
  }

  $onSave(text) {
    let { router } = this.props;

    if (text.trim()) {
      router.createAction("/todo/create", { text });
    }
  }
}
