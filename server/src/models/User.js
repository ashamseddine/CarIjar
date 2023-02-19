const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  driver_license: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
  join_time_stamp: {
    type: Date,
    default: Date.now,
  },
  about: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
