const express = require('express');
const router = express.Router();
const { Assignment, AssignmentSubmission } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/assignments/course/:courseId
// @desc    Get all assignments for a course
router.get('/course/:courseId', authMiddleware, async (req, res) => {
  try {
    const assignments = await Assignment.find({ course_id: req.params.courseId });
    res.json(assignments);
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).json({ error: 'Server error fetching assignments' });
  }
});

// @route   POST /api/assignments
// @desc    Create an assignment
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'staff') {
      return res.status(403).json({ error: 'Access denied.' });
    }
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    console.error('Error creating assignment:', err);
    res.status(500).json({ error: 'Server error creating assignment' });
  }
});

module.exports = router;
