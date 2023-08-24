import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddToFavorites";
import RemoveFavorites from "./components/RemoveFavorites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);

  const fetchMovies = async (searchValue) => {
    const res = await fetch(
      `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`
    );
    const data = await res.json();

    if (data.Search) {
      setMovies(data.Search);
    }
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    console.log('im being clicked')
  };

  useEffect(() => {
    fetchMovies(searchValue);
  }, [searchValue]);

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
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
