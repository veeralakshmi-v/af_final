const express = require('express');
const router = express.Router();
const { Profile } = require('../models');
const authMiddleware = require('../middleware/auth');
const bcrypt = require('bcryptjs');

// @route   GET /api/profiles
// @desc    Get all users (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'staff') {
      return res.status(403).json({ error: 'Access denied.' });
    }
    const profiles = await Profile.find().select('-password');
    res.json(profiles);
  } catch (err) {
    console.error('Error fetching profiles:', err);
    res.status(500).json({ error: 'Server error fetching profiles' });
  }
});

// @route   PUT /api/profiles/:id
// @desc    Update user profile
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    // Only allow updating own profile unless admin
    if (req.user.id !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied.' });
    }
    
    // Prevent role escalation
    const updateData = { ...req.body };
    if (req.user.role !== 'admin') {
      delete updateData.role;
    }
    
    // Hash password if updating
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select('-password');
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

// @route   DELETE /api/profiles/:id
// @desc    Delete user profile
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied.' });
    }
    
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting profile:', err);
    res.status(500).json({ error: 'Server error deleting profile' });
  }
});

module.exports = router;
