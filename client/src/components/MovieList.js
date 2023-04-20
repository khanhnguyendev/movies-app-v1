import React, { useState, useEffect } from 'react';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies')
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div>
      <h1>Movie List</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.name}>
            <h2>{movie.title}</h2>
            <video src={`${movie.path}`} type={movie.type} poster={movie.poster} width="400" controls />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
