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
    fetch(`omdb?s=${this.state.value}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({
            results: data.Search
          });
        });
      }
    });
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      value: this.state.value,
      onChange: this.handleChange
    })), /*#__PURE__*/React.createElement(MovieSearchResults, {
      results: this.state.results
    }));
  }

}

class MovieSearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.results) {
      return null;
    }

    return /*#__PURE__*/React.createElement("div", null, this.props.results.map(result => {
      return /*#__PURE__*/React.createElement(MovieSearchResult, {
        result: result
      });
    }));
  }

}

class MovieSearchResult extends React.Component {
  render() {
    if (!this.props.result.Poster || this.props.result.Poster === "N/A") {
      return /*#__PURE__*/React.createElement("div", {
        className: "movie-search-result"
      }, this.props.result.Title, " (", this.props.result.Year, ")");
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "movie-search-result"
    }, /*#__PURE__*/React.createElement("img", {
      src: this.props.result.Poster
    }), this.props.result.Title, " (", this.props.result.Year, ")");
  }

}

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(MovieApp), domContainer);