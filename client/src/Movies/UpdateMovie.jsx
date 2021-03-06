import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
    { id } = useParams();

  async function fetchMovie(id) {
    // detect if we are updating or adding
    if (id === "ADD") return;

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
  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  function handleChange(event) {
    const { id, value } = event.target;
    setValues({
      ...values,
      [id]: value,
    });
  }

  async function add() {
    try {
      const stars = values.stars.split(", "),
        requestId = requester.createUniqueID(),
        newValues = { ...values, stars: stars };
      await requester.post(
        "http://localhost:5000/api/movies",
        requestId,
        newValues
      );
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setValues(initialValues);
      window.open("/", "_self");
    }
  }

  async function update() {
    try {
      const stars = values.stars.split(", "),
        requestId = requester.createUniqueID(),
        newValues = { ...values, stars: stars };
      await requester.put(
        `http://localhost:5000/api/movies/${id}`,
        requestId,
        newValues
      );
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setValues(initialValues);
      window.open("/", "_self");
    }
  }

  function submit() {
    if (id === "ADD") add();
    else update();
  }

  return (
    <div autoComplete="off" role="form">
      <label htmlFor="title">Title</label>
      <br />
      <input
        width="100%"
        value={values.title}
        id="title"
        onChange={handleChange}
        type="text"
      />
      <br />
      <label htmlFor="director">Director</label>
      <br />
      <input
        width="100%"
        value={values.director}
        id="director"
        onChange={handleChange}
        type="text"
      />
      <br />
      <label htmlFor="metascore">Metascore</label>
      <br />
      <input
        value={values.metascore}
        width="100%"
        id="metascore"
        onChange={handleChange}
        type="text"
      />
      <br />
      <label htmlFor="stars">Stars</label>
      <br />
      <input
        width="100%"
        value={values.stars}
        id="stars"
        onChange={handleChange}
        type="text"
      />
      <br />
      <button onClick={submit}>{id === "ADD" ? "Add" : "Update"}</button>
    </div>
  );
}
