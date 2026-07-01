const express = require('express');
const router = express.Router();
const { StudentCertificate } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/certificates
// @desc    Get certificates for student
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') {
      query.student_id = req.user.id;
    }
    const certificates = await StudentCertificate.find(query)
      .populate('course_id', 'title thumbnail_url')
      .populate('student_id', 'name');
    res.json(certificates);
  } catch (err) {
    console.error('Error fetching certificates:', err);
    res.status(500).json({ error: 'Server error fetching certificates' });
  }
});

// @route   POST /api/certificates
// @desc    Issue a certificate (Staff/Admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin' && req.user.role !== 'staff') {
      return res.status(403).json({ error: 'Access denied.' });
    }
    const certificate = new StudentCertificate({
      ...req.body,
      issued_at: new Date()
    });
    await certificate.save();
    res.status(201).json(certificate);
  } catch (err) {
    console.error('Error issuing certificate:', err);
    res.status(500).json({ error: 'Server error issuing certificate' });
  }
});

module.exports = router;
