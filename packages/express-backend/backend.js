// backend.js
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
const findUserByName = (name) => {
    return users["users_list"].filter((user) => user["name"] === name);
};
const findUserByNameJob = (name, job) => {
    return users["users_list"].filter((user) => (user["name"] === name && user["job"] === job));
};
const findUserByJob = (job) => {
    return users["users_list"].filter((user) => user["job"] === job);

};
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//  app.get('/users', (req, res) => {
//     res.send(users);
// });

//vhttp://localhost:8000/users?name=Mac&%job=Bouncer
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined) {
    let result = findUserByNameJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else if (job != undefined) {
    let result = findUserByJob(job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

const deleteUserID = (id) => {
  return users["users_list"].findIndex((user) => user.id === id);
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const update_deleted = deleteUserID(id);
  if (update_deleted !== -1) {
    users["users_list"].splice(update_deleted, 1);
    res.status(204).send({ message: `ID ${id} has been deleted` });
  } else {
    res.status(404).send("Not Found"); // Return a "Not Found" error response
  }
});
