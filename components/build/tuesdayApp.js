const TuesdayApp = () => {
  const [movies, setMovies] = React.useState([]);
  const [staleData, setStaleData] = React.useState(false);
  React.useEffect(() => {
    const storedMovies = localStorage.getItem("dcravenus.tuesdayMovies");

    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
      setStaleData(true);
    }

    fetch("tuesday-showtimes").then(resp => resp.json()).then(data => {
      setMovies(data);
      localStorage.setItem("dcravenus.tuesdayMovies", JSON.stringify(data));
      setStaleData(false);
    });
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !movies.length || staleData ? /*#__PURE__*/React.createElement("div", {
    className: "spinner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "double-bounce1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "double-bounce2"
  })) : null, movies.map(movie => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: movie.imgUrl
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      "margin-left": "30px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "movie-title"
  }, movie.title), /*#__PURE__*/React.createElement("div", {
    className: "movie-metadata"
  }, /*#__PURE__*/React.createElement("span", {
    className: "movie-mpaa-rating"
  }, movie.mpaaRating, " "), /*#__PURE__*/React.createElement("span", {
    className: "movie-runtime"
  }, movie.runtime, " "), /*#__PURE__*/React.createElement("span", {
    className: "movie-metascore"
  }, movie.metascore, " Metascore")), /*#__PURE__*/React.createElement("div", null, movie.showtimes.map(showtime => /*#__PURE__*/React.createElement("div", null, showtime.theater, " ", /*#__PURE__*/React.createElement("span", null, showtime.times.join(" ")))))), /*#__PURE__*/React.createElement("br", null))));
};

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(TuesdayApp), domContainer);