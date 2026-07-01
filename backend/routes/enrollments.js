const express = require('express');
const router = express.Router();
const { Enrollment, Course } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/enrollments/me
// @desc    Get logged in user's enrollments
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student_id: req.user.id }).populate('course_id');
    res.json(enrollments);
  } catch (err) {
    console.error('Error fetching enrollments:', err);
    res.status(500).json({ error: 'Server error fetching enrollments' });
  }
});

// @route   POST /api/enrollments
// @desc    Enroll in a course
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { course_id } = req.body;
    
    if (!course_id) {
      return res.status(400).json({ error: 'course_id is required' });
    }

    // Check if already enrolled
    const existing = await Enrollment.findOne({ course_id, student_id: req.user.id });
    if (existing) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      course_id,
      student_id: req.user.id,
      progress: 0
    });
    
    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    console.error('Error enrolling in course:', err);
    res.status(500).json({ error: 'Server error during enrollment' });
  }
});

module.exports = router;
