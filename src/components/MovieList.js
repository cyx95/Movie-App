import React from "react";

const MovieList = (props) => {
  return (
    <>
      {props.movies.map((movie, i) => (
        <div className="poster">
          <img src={movie.Poster} alt="movie"></img>
          <div className="overlay d-flex align-items-center justify-content-center">
            Add to Favorites
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
