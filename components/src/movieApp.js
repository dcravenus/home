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
    fetch(`omdb?s=${this.state.value}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          this.setState({ results: data.Search });
        });
      }
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} onChange={this.handleChange} />
        </form>

        <MovieSearchResults results={this.state.results} />
      </div>
    );
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
    return (
      <div>
        {this.props.results.map(result => {
          return <MovieSearchResult result={result} />;
        })}
      </div>
    );
  }
}

class MovieSearchResult extends React.Component {
  render() {
    if (!this.props.result.Poster || this.props.result.Poster === "N/A") {
      return (
        <div className="movie-search-result">
          {this.props.result.Title} ({this.props.result.Year})
        </div>
      );
    }
    return (
      <div className="movie-search-result">
        <img src={this.props.result.Poster} />
        {this.props.result.Title} ({this.props.result.Year})
      </div>
    );
  }
}

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(MovieApp), domContainer);
