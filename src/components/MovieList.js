import React from "react";

const MovieList = (props) => {
  const FavoriteComponent = props.favoriteComponent;
  return (
    <>
      {props.movies.map((movie, i) => (
        <div className="poster d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie"></img>
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
