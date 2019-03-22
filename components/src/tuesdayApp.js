const TuesdayApp = () => {
  const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    const storedMovies = localStorage.getItem("dcravenus.tuesdayMovies");
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    }
    fetch("tuesday-showtimes")
      .then(resp => resp.json())
      .then(data => {
        setMovies(data);
        localStorage.setItem("dcravenus.tuesdayMovies", JSON.stringify(data));
      });
  }, []);
  return (
    <>
      {!movies.length ? (
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      ) : null}
      {movies.map(movie => (
        <div>
          <div className="movie-title">{movie.title}</div>
          <div className="movie-metadata">
            <span className="movie-mpaa-rating">{movie.mpaaRating} </span>
            <span className="movie-runtime">{movie.runtime} </span>
            <span className="movie-metascore">{movie.metascore} Metascore</span>
          </div>
          <br />
          <div>
            {movie.showtimes.map(showtime => (
              <div>
                {showtime.theater} <span>{showtime.times.join(" ")}</span>
              </div>
            ))}
          </div>
          <br />
        </div>
      ))}
    </>
  );
};

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(TuesdayApp), domContainer);
