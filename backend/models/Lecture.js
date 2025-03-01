const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  instructorId: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Lecture", lectureSchema);
