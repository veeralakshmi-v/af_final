const express = require('express');
const router = express.Router();
const { Course, CourseSection, CourseContent } = require('../models');
const authMiddleware = require('../middleware/auth');
const roleMiddleware = require('../middleware/role');

// @route   GET /api/courses
// @desc    Get all published courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ is_published: true }).populate('instructor_id', 'name');
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'Server error fetching courses' });
  }
});

// @route   GET /api/courses/admin/all
// @desc    Get all courses (Admin/Staff)
router.get('/admin/all', authMiddleware, roleMiddleware('admin', 'staff'), async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor_id', 'name');
    res.json(courses);
  } catch (err) {
    console.error('Error fetching all courses:', err);
    res.status(500).json({ error: 'Server error fetching all courses' });
  }
});

// @route   GET /api/courses/:id
// @desc    Get a single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor_id', 'name');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ error: 'Server error fetching course' });
  }
});

// @route   GET /api/courses/:id/content
// @desc    Get course sections and content (protected)
router.get('/:id/content', authMiddleware, async (req, res) => {
  try {
    const sections = await CourseSection.find({ course_id: req.params.id }).sort('order_index');
    const sectionsWithContent = await Promise.all(sections.map(async (section) => {
      const content = await CourseContent.find({ section_id: section._id }).sort('order_index');
      return {
        ...section.toObject(),
        content
      };
    }));
    res.json(sectionsWithContent);
  } catch (err) {
    console.error('Error fetching course content:', err);
    res.status(500).json({ error: 'Server error fetching course content' });
  }
});

// @route   POST /api/courses
// @desc    Create a new course (Staff/Admin only)
router.post('/', authMiddleware, roleMiddleware('admin', 'staff'), async (req, res) => {
  try {
    const course = new Course({
      ...req.body,
      instructor_id: req.user.id
    });
    
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ error: 'Server error creating course' });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update a course
router.put('/:id', authMiddleware, roleMiddleware('admin', 'staff'), async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(course);
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Server error updating course' });
  }
});

module.exports = router;
