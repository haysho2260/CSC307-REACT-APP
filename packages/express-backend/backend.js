// backend.js
// TODO:
import { addUser, getUsers, findUserById, deleteUserID } from "./user-services";
// .then statements
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      // Handle any errors from findUserByNameJob here
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
  x;
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  findUserById(id)
    .then((result) => {
      if (result === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      // Handle any errors from findUserById here
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  console.log("request body", JSON.stringify(userToAdd));
  addUser(userToAdd)
    .then((user) => res.status(201).send(user))
    .catch((error) => {
      // Handle any errors from findUserById here
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  deleteUserID(id)
    .then((update_deleted) => {
      if (update_deleted) {
        const index = users["users_list"].findIndex((user) => user.id === id);
        if (index !== -1) {
          users["users_list"].splice(index, 1);
          res.status(204).send();
        } else {
          res.status(404).send("Not Found");
        }
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});
