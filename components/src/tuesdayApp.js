const TuesdayApp = () => {
  const [movies, setMovies] = React.useState([]);
  const [staleData, setStaleData] = React.useState(false)

  React.useEffect(() => {
    const storedMovies = localStorage.getItem("dcravenus.tuesdayMovies");
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
      setStaleData(true)
    }
    fetch("tuesday-showtimes")
      .then(resp => resp.json())
      .then(data => {
        setMovies(data);
        localStorage.setItem("dcravenus.tuesdayMovies", JSON.stringify(data));
        setStaleData(false)
      });
  }, []);
  return (
    <>
      {!movies.length || staleData ? (
        <div className="spinner">
          <div className="double-bounce1" />
          <div className="double-bounce2" />
        </div>
      ) : null}
      {movies.map(movie => (
        <div style={{ display: "flex" }}>
          <img src={movie.imgUrl} />
          <div style={{ "margin-left": "30px" }}>
            <div className="movie-title">{movie.title}</div>
            <div className="movie-metadata">
              <span className="movie-mpaa-rating">{movie.mpaaRating} </span>
              <span className="movie-runtime">{movie.runtime} </span>
              <span className="movie-metascore">{movie.metascore} Metascore</span>
            </div>
            <div>
              {movie.showtimes.map(showtime => (
                <div>
                  {showtime.theater} <span>{showtime.times.join(" ")}</span>
                </div>
              ))}
            </div>
          </div>
          <br />
        </div>
      ))}
    </>
  );
};

const domContainer = document.querySelector("#react-container");
ReactDOM.render(React.createElement(TuesdayApp), domContainer);
