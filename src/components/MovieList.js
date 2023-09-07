import React from "react";

const MovieList = (props) => {
  const FavoriteComponent = props.favoriteComponent;

  return (
    <>
      {props.movies.map((movie) => (
        <div className="poster d-flex justify-content-start m-3" key={movie.id}>
          <img
            src={movie.Poster}
            alt="movie"
            onClick={() => props.movieDetails(movie)}
          ></img>

          <div
            onClick={() => props.handleFavoriteClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavoriteComponent />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
