import React, { useState, useEffect } from "react";

const MovieDetails = ({ movie }) => {
  const [movieDetails, setMovieDetails] = useState({});

  const fetchMovieDetails = async () => {
    const res = await fetch(
      `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=263d22d8`
    );
    const data = await res.json();
    console.log("what is data", data);
    setMovieDetails((prevMovieDetails) => ({
      ...prevMovieDetails,
      ...data,
    }));
    console.log("what is movieDetails", movieDetails);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [movie.imdbID]);

  return (
    <>
      <div className=" m-3">
        <img src={movie.Poster} alt="movie"></img>
        <h2>{movie.Title}</h2>
        <p>{movieDetails.Plot}</p>
      </div>
    </>
  );
};

export default MovieDetails;
