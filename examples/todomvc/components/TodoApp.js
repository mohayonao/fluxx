import Header from "./Header";
import Footer from "./Footer";
import MainSection from "./MainSection";

export default class TodoApp extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = this.getStateFromStores();

    this.$onChange = this.$onChange.bind(this);
  }

  getStateFromStores() {
    let { router } = this.props;

    return router.getStateFromStores();
  }

  componentWillMount() {
    let { router } = this.props;

    router.addChangeListener(this.$onChange);
  }

  componentWillUnmount() {
    let { router } = this.props;

    router.removeChangeListener(this.$onChange);
  }

  render() {
    let { router } = this.props;

  	return (
      <div>
        <Header router={ router } />
        <MainSection
          router={ router }
          allTodos={ this.state.todo.allTodos }
          areAllComplete={ this.state.todo.areAllComplete }
        />
        <Footer router={ router } allTodos={ this.state.todo.allTodos } />
      </div>
  	);
  }

  $onChange() {
    this.setState(this.getStateFromStores());
  }
}
