import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <>
      <button>
        <Link to={"/update-movie/ADD"}>Add a movie</Link>
      </button>
      <div className="movie-list">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </div>
    </>
  );
}
