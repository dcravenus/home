const TuesdayApp = () => {
  const [movies, setMovies] = React.useState([]);
  React.useEffect(() => {
    fetch("tuesday-showtimes")
      .then(resp => resp.json())
      .then(data => {
        setMovies(data);
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
