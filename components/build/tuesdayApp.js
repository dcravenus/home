const TuesdayApp = () => {
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    fetch("tuesday-showtimes").then(resp => resp.json()).then(data => {
      setMovies(data);
    });
  }, []);
  return React.createElement(React.Fragment, null, movies.map(movie => React.createElement("div", null, React.createElement("div", {
    className: "movie-title"
  }, movie.title), React.createElement("div", {
    className: "movie-metadata"
  }, React.createElement("span", {
    class: "movie-mpaa-rating"
  }, movie.mpaaRating, " "), React.createElement("span", {
    class: "movie-runtime"
  }, movie.runtime, " "), React.createElement("span", {
    class: "movie-metascore"
  }, movie.metascore, " Metascore")), React.createElement("br", null), React.createElement("div", null, movie.showtimes.map(showtime => React.createElement("div", null, showtime.theater, " ", React.createElement("span", null, showtime.times.join(" "))))), React.createElement("br", null))));
};

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(TuesdayApp), domContainer);