const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
  username: String,
  mobilenumber: Number,
  email: String,
  password: String,
});

module.exports = mongoose.model("registerUser", registerSchema);