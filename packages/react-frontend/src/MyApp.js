// src/MyApp.js
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      // convert, or serialize, the in-memory object to
      // a string which we can send "over the wire"
      body: JSON.stringify(person),
    });

    return promise;
  }

  function deleteUser(person) {
    const promise = fetch(`http://localhost:8000/users/${person.id}`, {
      method: "DELETE",
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => (res.status == 201 ? res.json() : undefined))
      .then((person) => {
        // this updates the frontend with the new person if backend updated
        if (person) setCharacters([...characters, person]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    // may have error becuase json returne dby server may invalid
    fetchUsers()
      // because we expect a json format
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    deleteUser(characters[index])
    setCharacters(updated);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
