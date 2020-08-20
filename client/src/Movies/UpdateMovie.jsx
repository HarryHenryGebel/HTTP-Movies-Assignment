import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import axios from "axios";
import requester from "easier-requests";

const initialValues = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

export default function UpdateMovie(props) {
  const [values, setValues] = useState(initialValues),
    { id } = useParams(),
    history = useHistory();

  async function fetchMovie(id) {
    try {
      const requestId = requester.createUniqueID();
      await requester.get(`http://localhost:5000/api/movies/${id}`, requestId);
      const values = requester.response(requestId).data;
      values.stars = values.stars.join(", ");
      setValues(values);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  useEffect(() => fetchMovie(id), []);

  function handleChange(event) {
    const { id, value } = event.target;
    setValues({
      ...values,
      [id]: value,
    });
  }

  function submit() {}

  return (
    <div autoComplete="off" role="form">
      <input
        value={values.title}
        id="title"
        onChange={handleChange}
        type="text"
      />
      <input
        value={values.director}
        id="director"
        onChange={handleChange}
        type="text"
      />
      <input
        value={values.metascore}
        id="metascore"
        onChange={handleChange}
        type="text"
      />
      <input
        value={values.stars}
        id="stars"
        onChange={handleChange}
        type="text"
      />
      <button onClick={submit}>Submit</button>
    </div>
  );
}
