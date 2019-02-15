"use strict";

class MovieApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("submitted!");
    fetch(`omdb?s=${this.state.value}`);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} onChange={this.handleChange} />
        </form>
      </div>
    );
  }
}

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(MovieApp), domContainer);
