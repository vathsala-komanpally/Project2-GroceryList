// import express
const express = require("express");
const bcrypt = require("bcrypt");
const adminModel = require("../models/AdminUser.Model");
// Create a new router to handle user routes
const router = express.Router();

router.post("/register", (request, response) => {
  const body = request.body;
  const passwordHash = bcrypt.hashSync(body.password, 10);
  const user = { username: body.username, password: passwordHash };

  adminModel.create(user).then((Data) => {
    response.send(Data);
  }).catch((err) => {
    response.status(400).send(err);
  });
});

router.post("/login", (request, response) => {
  adminModel.findOne({ username: request.body.username }).then((userData) => {
    if (userData) {
      const checkHashPassword = bcrypt.compareSync(request.body.password, userData.password);
      if (checkHashPassword) {
        response.send("logged In");
      } else {
        response.status(401).send("wrong credentials for Password");
      }
    } else {
      response.status(404).send('Wrong credentials User');
    }
  })
});

router.get("/logout", (request, response) => {
  response.send("User has logged out!");
});

module.exports = router;