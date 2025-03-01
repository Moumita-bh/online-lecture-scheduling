const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Hashed
});

module.exports = mongoose.model("Instructor", instructorSchema);
