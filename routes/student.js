// ============================================
// STUDENT ROUTES - Student profile and data
// ============================================

const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/auth');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const Appointment = require('../models/Appointment');

// Get student profile
router.get('/profile', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId }).populate('userId', 'email profilePicture');
    if (!student) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update profile picture
router.put('/profile/picture', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const { profilePicture } = req.body;
    await User.findByIdAndUpdate(req.userId, { profilePicture });
    res.json({ message: 'Profile picture updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get attendance records
router.get('/attendance', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });
    const attendance = await Attendance.find({ studentId: student._id }).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get attendance summary
router.get('/attendance/summary', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });
    const attendance = await Attendance.find({ studentId: student._id });

    const summary = {
      totalRecords: attendance.length,
      present: attendance.filter(a => a.status === 'Present').length,
      absent: attendance.filter(a => a.status === 'Absent').length,
      late: attendance.filter(a => a.status === 'Late').length,
      excused: attendance.filter(a => a.status === 'Excused').length
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get appointments
router.get('/appointments', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });
    const appointments = await Appointment.find({ studentId: student._id }).sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
