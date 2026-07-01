const express = require('express');
const router = express.Router();
const { CourseContent } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/content
// @desc    Get all content for a section
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { section_id } = req.query;
    if (section_id) {
      const content = await CourseContent.find({ section_id }).sort({ order_index: 1 });
      return res.json(content);
    }
    const content = await CourseContent.find();
    res.json(content);
  } catch (err) {
    console.error('Error fetching content:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   POST /api/content
// @desc    Create new content
router.post('/', authMiddleware, async (req, res) => {
  try {
    const content = new CourseContent(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    console.error('Error creating content:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   PUT /api/content/:id
// @desc    Update content
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const content = await CourseContent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(content);
  } catch (err) {
    console.error('Error updating content:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route   DELETE /api/content/:id
// @desc    Delete content
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await CourseContent.findByIdAndDelete(req.params.id);
    res.json({ message: 'Content deleted' });
  } catch (err) {
    console.error('Error deleting content:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
