const TuesdayApp = () => {
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    fetch("tuesday-showtimes").then(resp => resp.json()).then(data => {
      setMovies(data);
    });
  }, []);
  return React.createElement(React.Fragment, null, !movies.length ? React.createElement("div", {
    className: "spinner"
  }, React.createElement("div", {
    className: "double-bounce1"
  }), React.createElement("div", {
    className: "double-bounce2"
  })) : null, movies.map(movie => React.createElement("div", null, React.createElement("div", {
    className: "movie-title"
  }, movie.title), React.createElement("div", {
    className: "movie-metadata"
  }, React.createElement("span", {
    className: "movie-mpaa-rating"
  }, movie.mpaaRating, " "), React.createElement("span", {
    className: "movie-runtime"
  }, movie.runtime, " "), React.createElement("span", {
    className: "movie-metascore"
  }, movie.metascore, " Metascore")), React.createElement("br", null), React.createElement("div", null, movie.showtimes.map(showtime => React.createElement("div", null, showtime.theater, " ", React.createElement("span", null, showtime.times.join(" "))))), React.createElement("br", null))));
};

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(TuesdayApp), domContainer);