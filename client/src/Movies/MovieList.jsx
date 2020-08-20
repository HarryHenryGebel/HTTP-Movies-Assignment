import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

export default function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <MovieCard movie={movie} />
        </Link>
      ))}
    </div>
  );
}