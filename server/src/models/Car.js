const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  dummy: {
    type: String,
  },
});

module.exports = mongoose.model("Car", carSchema);
