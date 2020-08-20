import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import requester from "easier-requests";

export default function App() {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  async function getMovieList() {
    try {
      const id = requester.createUniqueID();
      await requester.get("http://localhost:5000/api/movies", id);
      setMovieList(requester.response(id).data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  function addToSavedList(movie) {
    setSavedList([...savedList, movie]);
  }

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
    </>
  );
}
