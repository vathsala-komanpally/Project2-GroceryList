// import express
const express = require("express");
const bcrypt = require("bcrypt");
//const UserModel = require("../models/User.model");
const RegisterModel = require("../models/RegisterUser.Model");

// Create a new router to handle user routes
const router = express.Router();

router.post("/login", (request, response) => {
  RegisterModel.findOne({ email: request.body.email }).then((userData) => {
    console.log(userData);
    if (userData) {
      const checkHashPassword = bcrypt.compareSync(
        request.body.password, userData.password);
      if (checkHashPassword) {
        response.send("user logged in");
      } else {
        response.status(401).send("Wrong credentials for password");
      }
    } else {
      response.status(401).send("Can't find account with that email address");
    }
  });
});


router.get("/logout", (request, response) => {
  response.send("User has logged out!");
});

router.post("/register", (request, response) => {

  const body = request.body;
  console.log("user register body:", body);

  const passwordHash = bcrypt.hashSync(body.password, 10);
  console.log("passwordHash:", passwordHash);

  const registerUser = {
    username: body.username, mobilenumber: body.mobilenumber,
    email: body.email, password: passwordHash
  };

  RegisterModel.create(registerUser).then((registerData) => {
    response.send(registerData);
  }).catch((err) => {
    console.log("error:", err);
    response.status(400).send(err);
  });
});

module.exports = router;