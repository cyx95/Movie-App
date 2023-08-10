import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

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
    fetchMovies(searchValue);
  }, [searchValue]);

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default App;
