import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddToFavorites";
import RemoveFavorites from "./components/RemoveFavorites";
import MovieDetails from "./components/MovieDetails";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchAllMovies = async () => {
    const res = await fetch("http://www.omdbapi.com/?s=comedy&apikey=7dd11a66");
    const data = await res.json();
    if (data.Search) {
      setMovies(data.Search);
    }
  };

  const fetchMovies = async (searchValue) => {
    const res = await fetch(
      `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`
    );
    const data = await res.json();

    if (data.Search) {
      setMovies(data.Search);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  useEffect(() => {
    fetchMovies(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("react-movie-app-favorites")
    );
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  const movieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div>
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            movieDetails={movieDetails}
            favoriteComponent={AddFavorite}
            handleFavoriteClick={addFavoriteMovie}
          />
        )}
      </div>

      <div className="row">
        <MovieList
          movies={movies}
          movieDetails={movieDetails}
          favoriteComponent={AddFavorite}
          handleFavoriteClick={addFavoriteMovie}
        />
      </div>
      <div className="row d-flex align-items-cneter mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="row">
        <MovieList
          movies={favorites}
          handleFavoriteClick={removeFavoriteMovie}
          favoriteComponent={RemoveFavorites}
        />
      </div>
    </div>
  );
};

export default App;
