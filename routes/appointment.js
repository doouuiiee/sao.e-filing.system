// ============================================
// APPOINTMENT ROUTES - Appointment management
// ============================================

const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Appointment = require('../models/Appointment');
const Student = require('../models/Student');

// Request reschedule (student)
router.put('/:id/reschedule', authMiddleware, async (req, res) => {
  try {
    const { date, time } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (appointment.status === 'Done') {
      return res.status(400).json({ message: 'Cannot reschedule completed appointment' });
    }
    
    appointment.date = date;
    appointment.time = time;
    appointment.status = 'Rescheduled';
    await appointment.save();
    
    res.json({ message: 'Reschedule request submitted', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel appointment
router.put('/:id/cancel', authMiddleware, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (appointment.status === 'Done') {
      return res.status(400).json({ message: 'Cannot cancel completed appointment' });
    }
    
    appointment.status = 'Cancelled';
    await appointment.save();
    
    res.json({ message: 'Appointment cancelled', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
