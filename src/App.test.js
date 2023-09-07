import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// Mocking fetch for testing purposes
const mockFetchMovieData = (data) => {
  global.fetch = jest.fn().mockResolvedValue({
    json: async () => data,
  });
};


beforeEach(() => {
  // Clear local storage before each test
  localStorage.clear();
});

afterEach(() => {
  // Reset the fetch mock and clear any mock calls
  jest.clearAllMocks();
});

describe("App component", () => {
  it("renders the App component", () => {
    render(<App />);
    const appElement = screen.getByTestId("app-component");
    expect(appElement).toBeInTheDocument();
  });

  it("displays movie list heading", () => {
    render(<App />);
    const movieListHeading = screen.getByText("Movies");
    expect(movieListHeading).toBeInTheDocument();
  });

  it("displays favorites heading", () => {
    render(<App />);
    const favoritesHeading = screen.getByText("Favorites");
    expect(favoritesHeading).toBeInTheDocument();
  });

  it("fetches and displays movies", async () => {
    mockFetchMovieData();
    // Wait for the movies to be loaded
    const movieElement = await screen.findByTestId("movie-list");
    expect(movieElement).toBeInTheDocument();
  });

  it("displays movie details when a movie is selected", async () => {
    render(<App />);
    
    // Select a movie
    const movieElement = await screen.findByText("The King of Comedy");
    fireEvent.click(movieElement);

    // Check if the movie details are displayed
    const movieDetails = await screen.findByTestId("movie-details");
    expect(movieDetails).toBeInTheDocument();
  });

  it("adds a movie to favorites when clicked", async () => {
    render(<App />);
    
    // Select a movie
    const movieElement = await screen.findByText("Movie 1");
    fireEvent.click(movieElement);

    // Add the movie to favorites
    const addToFavoritesButton = await screen.findByText("Add to Favorites");
    fireEvent.click(addToFavoritesButton);

    // Check if the movie is in the favorites list
    const favoritesList = await screen.findByText("Favorites");
    expect(favoritesList).toBeInTheDocument();
  });

  it("removes a movie from favorites when clicked", async () => {
    render(<App />);
    
    // Select a movie
    const movieElement = await screen.findByText("Movie 1");
    fireEvent.click(movieElement);

    // Add the movie to favorites
    const addToFavoritesButton = await screen.findByText("Add to Favorites");
    fireEvent.click(addToFavoritesButton);

    // Remove the movie from favorites
    const removeFromFavoritesButton = await screen.findByText("Remove from Favorites");
    fireEvent.click(removeFromFavoritesButton);

    // Check if the movie is no longer in the favorites list
    const favoritesList = screen.queryByText("Favorites");
    expect(favoritesList).toBeNull();
  });
});
