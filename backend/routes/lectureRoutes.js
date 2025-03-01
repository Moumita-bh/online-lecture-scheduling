const express = require("express");
const Lecture = require("../models/Lecture");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all lectures
router.get("/", async (req, res) => {
  const lectures = await Lecture.find().populate("courseId").populate("instructorId");
  res.json(lectures);
});

// Assign a lecture
router.post("/", protect, async (req, res) => {
  const { courseId, instructorId, date } = req.body;

  const existingLecture = await Lecture.findOne({ instructorId, date });
  if (existingLecture) {
    return res.status(400).json({ error: "Instructor already has a lecture on this date." });
  }

  const lecture = new Lecture({ courseId, instructorId, date });
  await lecture.save();
  res.json(lecture);
});

module.exports = router;
