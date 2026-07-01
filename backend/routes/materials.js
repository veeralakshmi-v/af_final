const express = require('express');
const router = express.Router();
const CourseMaterial = require('../models/CourseMaterial');

// Get materials by course_id
router.get('/', async (req, res) => {
  try {
    const { course_id } = req.query;
    const query = course_id ? { course_id } : {};
    const materials = await CourseMaterial.find(query).sort('order_index');
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create material
router.post('/', async (req, res) => {
  try {
    const material = new CourseMaterial(req.body);
    await material.save();
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete material
router.delete('/:id', async (req, res) => {
  try {
    const material = await CourseMaterial.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ error: 'Material not found' });
    res.json({ message: 'Material deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
