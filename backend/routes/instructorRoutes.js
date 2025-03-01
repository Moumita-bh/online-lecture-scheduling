const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Instructor = require("../models/Instructor");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all instructors
router.get("/", async (req, res) => {
  const instructors = await Instructor.find();
  res.json(instructors);
});

// Register instructor
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingInstructor = await Instructor.findOne({ email });
  if (existingInstructor) {
    return res.status(400).json({ error: "Instructor already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const instructor = new Instructor({ name, email, password: hashedPassword });

  await instructor.save();
  res.json({ message: "Instructor registered successfully" });
});

// Login instructor
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const instructor = await Instructor.findOne({ email });
  if (!instructor) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, instructor.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: instructor._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Get instructor profile (Protected Route)
router.get("/profile", protect, async (req, res) => {
  const instructor = await Instructor.findById(req.user.id);
  res.json(instructor);
});

module.exports = router;
