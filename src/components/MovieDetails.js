import React, { useState, useEffect } from "react";

const MovieDetails = (props) => {
  const FavoriteComponent = props.favoriteComponent;

  const [movieDetails, setMovieDetails] = useState({});

  const fetchMovieDetails = async () => {
    const res = await fetch(
      `http://www.omdbapi.com/?i=${props.movie.imdbID}&apikey=263d22d8`
    );
    const data = await res.json();
    console.log("what is data", data);
    setMovieDetails((prevMovieDetails) => ({
      ...prevMovieDetails,
      ...data,
    }));
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [props.movie.imdbID]);

  return (
    <div className="row">
      <div className="col-md-5">
        <div className="image d-flex justify-content-start m-3">
          <img src={props.movie.Poster} alt={props.movie.Type}></img>
          <div
            onClick={() => props.handleFavoriteClick(props.movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavoriteComponent />
          </div>
        </div>
      </div>
      <div className="col-md-5">
        <div className="movie-details">
          <h2>{props.movie.Title}</h2>
          <p>{movieDetails.Year}</p>
          <p>Cast: {movieDetails.Actors}</p>
          <p>Genre: {movieDetails.Genre}</p>
          <p>{movieDetails.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
