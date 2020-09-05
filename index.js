// how we import modules and make them available to our application
const express = require("express");
const cors = require("cors");
const shortid = require("shortid");
const Joi = require("joi");
// const validateUserReq = require("./validation/validation.js");

// this is how we import node modules --> same as 'import express as server from "express"'
const server = express();
// const validation = validation();

// id, username, bio
let users = [{
    id: shortid.generate(),
    username: "Bob",
    bio: "I am a real person",
  },
  {
    id: shortid.generate(),
    username: "Fred",
    bio: "I am more real than Bob",
  },
];

// .use() sets up whatever middleware we want to use
// adds body prop to req
server.use(express.json());
server.use(cors());

// validation
const validateUserReq = (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    bio: Joi.string().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const {
    error,
    // value // we aren't using value, so we don't need it
  } = schema.validate(req.body, options); // validating req.body, storing any errors in error

  if (error) {
    res.status(400).json({
      // message: error.message
      message: "Please provide username and bio for the user.",
    });
  } else {
    return true;
  }
};

// POST
server.post("/api/users", (req, res) => {
  const user = req.body;
  const valid = validateUserReq(req, res);

  if (valid) {
    user.id = shortid.generate();
    users.push(user);
    res.status(201).json(user);
  } else if (!valid) {
    valid;
  } else {
    res.status(500).json({
      message: "There was an error saving the new user, please try again.",
    });
  }
});

// GET ALL USERS
server.get("/api/users", (req, res) => {
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(500).json({
      message: "There was an error retrieving the users, please try again.",
    });
  }
  // if error retrieving users, respond w 500 err
});

// GET INDIVIDUAL USER
server.get("/api/users/:id", (req, res) => {
  const {
    id
  } = req.params;

  const user = users.find((user) => user.id === id);

  if (user) {
    res.status(200).json(user);
  } else if (!user) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  } else {
    res.status(500).json({
      message: "There was an error retrieving the specified user.",
    });
  }
});

// DELETE INDIVIDUAL USER
server.delete("/api/users/:id", (req, res) => {
  const {
    id
  } = req.params;

  const deleted = users.find((user) => user.id === id);

  if (deleted) {
    users = users.filter((user) => user.id !== id);
    res.status(200).json({
      message: `Successfully deleted user with id: ${deleted.id}`,
    });
  } else if (!deleted) {
    res.status(404).json({
      message: "Requested user id not found",
    });
  } else {
    res.status(500).json({
      message: "There was an issue with the server, please try again.",
    });
  }
});

// EDIT INDIVIDUAL USER
server.put("/api/users/:id", (req, res) => {
  const {
    id
  } = req.params;
  const valid = validateUserReq(req, res);
  const changes = req.body;
  changes.id = id;
  let index = users.findIndex((user) => user.id === id);

  // if it doesn't equal -1 it means it was found
  // validation is here so that users don't accidentally remove username/bio prop by not supplying it
  if (valid && index !== -1) {
    users[index] = changes;
    res.status(200).json(users[index]);
  } else if (index === -1) {
    res.status(404).json({
      message: "The user with the specified ID does not exist",
    });
  } else {
    res.status(500).json({
      message: "The user information could not be modified at this time, please try again.",
    });
  }
});

// console.log(server.stack);

const PORT = 5000;

server.listen(PORT, () => {
  console.log("Server listening on localhost:", PORT);
});

/*
W/O REQ.BODY SCHEMA VALIDATION IN PUT REQUEST
  if (index !== -1) {
    users[index] = changes;
    res.status(200).json(users[index]);
  } else {
    res.status(404).json({
      message: "ID not found"
    });
  };
*/