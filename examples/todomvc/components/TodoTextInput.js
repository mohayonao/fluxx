const ENTER_KEY_CODE = 13;

export default class TodoTextInput extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = { value: this.props.value || "" };

    this.save = this.save.bind(this);
    this.$onChange = this.$onChange.bind(this);
    this.$onKeyDown = this.$onKeyDown.bind(this);
  }

  render() {
    return (
      <input
        className={ this.props.className }
        id={ this.props.id }
        placeholder={ this.props.placeholder }
        onBlur={ this.save }
        onChange={ this.$onChange }
        onKeyDown={ this.$onKeyDown }
        value={ this.state.value }
        autoFocus={ true }
      />
    );
  }

  save() {
    this.props.onSave(this.state.value);
    this.setState({
      value: "",
    });
  }

  $onChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  $onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.save();
    }
  }
}
