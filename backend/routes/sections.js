const express = require('express');
const router = express.Router();
const { CourseSection, CourseContent } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/sections
// @desc    Create a new section
router.post('/', authMiddleware, async (req, res) => {
  try {
    const section = new CourseSection(req.body);
    await section.save();
    res.status(201).json(section);
  } catch (err) {
    console.error('Error creating section:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/sections/:id
// @desc    Update a section
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const section = await CourseSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(section);
  } catch (err) {
    console.error('Error updating section:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/sections/:id
// @desc    Delete a section
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await CourseSection.findByIdAndDelete(req.params.id);
    // Also delete associated content
    await CourseContent.deleteMany({ section_id: req.params.id });
    res.json({ message: 'Section deleted' });
  } catch (err) {
    console.error('Error deleting section:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
