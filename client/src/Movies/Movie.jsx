import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import requester from "easier-requests";

export default function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null),
    { id } = useParams();

  async function fetchMovie(id) {
    try {
      const requestId = requester.createUniqueID();
      await requester.get(`http://localhost:5000/api/movies/${id}`, requestId);
      setMovie(requester.response(requestId).data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  function saveMovie() {
    addToSavedList(movie);
  }

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie} role="button">
        Save
      </div>
      <button>
        <Link to={`/update-movie/${id}`}>Update</Link>
      </button>
    </div>
  );
}
