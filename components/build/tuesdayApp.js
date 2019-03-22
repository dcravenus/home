const TuesdayApp = () => {
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    const storedMovies = localStorage.getItem("dcravenus.tuesdayMovies");

    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }

    fetch("tuesday-showtimes").then(resp => resp.json()).then(data => {
      setMovies(data);
      localStorage.setItem("dcravenus.tuesdayMovies", JSON.stringify(data));
    });
  }, []);
  return React.createElement(React.Fragment, null, !movies.length ? React.createElement("div", {
    className: "spinner"
  }, React.createElement("div", {
    className: "double-bounce1"
  }), React.createElement("div", {
    className: "double-bounce2"
  })) : null, movies.map(movie => React.createElement("div", {
    style: {
      display: "flex"
    }
  }, React.createElement("img", {
    src: movie.imgUrl
  }), React.createElement("div", {
    style: {
      "margin-left": "30px"
    }
  }, React.createElement("div", {
    className: "movie-title"
  }, movie.title), React.createElement("div", {
    className: "movie-metadata"
  }, React.createElement("span", {
    className: "movie-mpaa-rating"
  }, movie.mpaaRating, " "), React.createElement("span", {
    className: "movie-runtime"
  }, movie.runtime, " "), React.createElement("span", {
    className: "movie-metascore"
  }, movie.metascore, " Metascore")), React.createElement("div", null, movie.showtimes.map(showtime => React.createElement("div", null, showtime.theater, " ", React.createElement("span", null, showtime.times.join(" ")))))), React.createElement("br", null))));
};

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(TuesdayApp), domContainer);