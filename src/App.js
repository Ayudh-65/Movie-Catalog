import axios from "axios";
import { useState } from "react";
import "./App.css";
import searchIcon from "./searchIcon.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?apikey=5feb8aaa";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  async function getMovies(title) {
    if(!title){
      setMovies([]);
      return;
    }
    var allMovies = [];
    for (let i = 1; i <= 3; i++) {
      const page = await axios
        .get(`${API_URL}&s=${title}&page=${i}`)
        .then((res) => res.data)
        .catch((error) => console.log(error));

        if(page.Search){
          allMovies = allMovies.concat(page.Search);
        }
    }
    setMovies(allMovies);
  }

  return (
    <div className="app">
      <h1>Movie Catalog</h1>

      <form
        className="search"
        onSubmit={(e) => {
          e.preventDefault();
          getMovies(searchTerm);
        }}
      >
        <input
          placeholder="Search for Movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </form>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie?.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;