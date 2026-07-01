const express = require('express');
const router = express.Router();
const { Payment } = require('../models');
const authMiddleware = require('../middleware/auth');

// @route   GET /api/payments
// @desc    Get payments (All for admin, own for students)
router.get('/', authMiddleware, async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== 'admin') {
      query.student_id = req.user.id;
    }
    
    const payments = await Payment.find(query)
      .populate('course_id', 'title')
      .populate('student_id', 'name email');
      
    res.json(payments);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ error: 'Server error fetching payments' });
  }
});

// @route   POST /api/payments
// @desc    Create a payment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const payment = new Payment({
      ...req.body,
      student_id: req.user.id
    });
    
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ error: 'Server error creating payment' });
  }
});

// @route   GET /api/payments/:id
// @desc    Get a single payment by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('course_id', 'title description thumbnail_url')
      .populate('student_id', 'name email');
      
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    // Check if user is admin or owns the payment
    if (req.user.role !== 'admin' && payment.student_id._id.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(payment);
  } catch (err) {
    console.error('Error fetching payment:', err);
    res.status(500).json({ error: 'Server error fetching payment' });
  }
});

// @route   PUT /api/payments/:id
// @desc    Update a payment
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    
    res.json(payment);
  } catch (err) {
    console.error('Error updating payment:', err);
    res.status(500).json({ error: 'Server error updating payment' });
  }
});

// @route   DELETE /api/payments/:id
// @desc    Delete a payment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    console.error('Error deleting payment:', err);
    res.status(500).json({ error: 'Server error deleting payment' });
  }
});

module.exports = router;
