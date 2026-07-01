const express = require('express');
const router = express.Router();
const { CourseInquiry } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/inquiries
// @desc    Get all inquiries (Staff/Admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const inquiries = await CourseInquiry.find().sort('-createdAt');
    res.json(inquiries);
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/inquiries
// @desc    Create new inquiry (Public)
router.post('/', async (req, res) => {
  try {
    const inquiry = new CourseInquiry(req.body);
    await inquiry.save();
    res.status(201).json(inquiry);
  } catch (err) {
    console.error('Error creating inquiry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry status
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const inquiry = await CourseInquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(inquiry);
  } catch (err) {
    console.error('Error updating inquiry:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
