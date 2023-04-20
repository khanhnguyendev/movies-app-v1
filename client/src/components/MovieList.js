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

            <style jsx>{`
                .movie-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .movie-item {
                    margin-bottom: 2rem;
                    padding: 1rem;
                    border: 1px solid #ccc;
                }

                @media screen and (min-width: 768px) {
                    .movie-item {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    }

                    .movie-item h2 {
                    flex-basis: 100%;
                    }

                    .movie-item video {
                    flex-basis: 400px;
                    margin-left: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default MovieList;
