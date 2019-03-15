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
      {movies.map(movie => (
        <div>
          <div className="movie-title">{movie.title}</div>
          <div className="movie-metadata">
            <span class="movie-mpaa-rating">{movie.mpaaRating} </span>
            <span class="movie-runtime">{movie.runtime} </span>
            <span class="movie-metascore">{movie.metascore} Metascore</span>
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
