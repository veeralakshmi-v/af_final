const express = require('express');
const router = express.Router();
const { Quiz, QuizQuestion, QuizAttempt } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/quizzes/course/:courseId
// @desc    Get all quizzes for a course
router.get('/course/:courseId', authMiddleware, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ course_id: req.params.courseId });
    res.json(quizzes);
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    res.status(500).json({ error: 'Server error fetching quizzes' });
  }
});

// @route   POST /api/quizzes
// @desc    Create a quiz
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'staff') {
      return res.status(403).json({ error: 'Access denied.' });
    }
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    console.error('Error creating quiz:', err);
    res.status(500).json({ error: 'Server error creating quiz' });
  }
});

module.exports = router;
