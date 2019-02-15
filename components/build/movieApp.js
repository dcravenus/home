"use strict";

class MovieApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("submitted!");
    fetch(`omdb?s=${this.state.value}`);
  }

  render() {
    return React.createElement("div", null, React.createElement("form", {
      onSubmit: this.handleSubmit
    }, React.createElement("input", {
      value: this.state.value,
      onChange: this.handleChange
    })));
  }

}

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(MovieApp), domContainer);