// ============================================
// SAO ROUTES - SAO Coordinator specific functions
// ============================================

const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/auth');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Appointment = require('../models/Appointment');
const Attendance = require('../models/Attendance');
const { sendEmail, emailTemplates } = require('../utils/emailService');
const { VIOLATION_CATEGORIES, ATTENDANCE_MATTER_CATEGORIES } = require('../utils/constants');

// Get violation categories
router.get('/violation-categories', authMiddleware, requireRole('sao'), (req, res) => {
  res.json(VIOLATION_CATEGORIES);
});

// Get attendance matter categories
router.get('/attendance-categories', authMiddleware, requireRole('sao'), (req, res) => {
  res.json(ATTENDANCE_MATTER_CATEGORIES);
});

// Get all section folders (all students grouped by section)
router.get('/sections', authMiddleware, requireRole('sao'), async (req, res) => {
  try {
    const students = await Student.find().populate('userId', 'email');
    
    // Group by section
    const sections = {};
    students.forEach(student => {
      if (!sections[student.section]) {
        sections[student.section] = [];
      }
      sections[student.section].push(student);
    });
    
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create appointment and send notifications
router.post('/appointments', authMiddleware, requireRole('sao'), async (req, res) => {
  try {
    const { studentId, type, category, description, date, time } = req.body;
    
    const teacher = await Teacher.findOne({ userId: req.userId });
    const student = await Student.findById(studentId).populate('userId', 'email');
    
    // Create appointment
    const appointment = new Appointment({
      studentId,
      type,
      category,
      reason: category,
      description: description || '',
      date,
      time,
      createdBy: teacher._id
    });
    await appointment.save();
    
    // Format date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Send emails
    if (type === 'Violation') {
      // To student
      await sendEmail(
        student.userId.email,
        emailTemplates.studentViolation(student.fullName, category, formattedDate, time)
      );
      
      // To parent/guardian
      await sendEmail(
        student.parentGuardian.email,
        emailTemplates.parentViolation(student.fullName, category, formattedDate, time)
      );
      
      // To adviser
      const adviser = await Teacher.findOne({ advisorySection: student.section }).populate('userId', 'email');
      if (adviser) {
        await sendEmail(
          adviser.userId.email,
          emailTemplates.adviserViolation(student.fullName, category, formattedDate, time)
        );
      }
    } else if (type === 'Attendance Matter') {
      // To student
      await sendEmail(
        student.userId.email,
        emailTemplates.studentAttendance(student.fullName, category, formattedDate, time)
      );
      
      // To parent/guardian
      await sendEmail(
        student.parentGuardian.email,
        emailTemplates.parentAttendance(student.fullName, category, formattedDate, time)
      );
      
      // To adviser
      const adviser = await Teacher.findOne({ advisorySection: student.section }).populate('userId', 'email');
      if (adviser) {
        await sendEmail(
          adviser.userId.email,
          emailTemplates.adviserAttendance(student.fullName, category, formattedDate, time)
        );
      }
    }
    
    res.json({ message: 'Appointment created and notifications sent', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all appointments
router.get('/appointments', authMiddleware, requireRole('sao'), async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('studentId', 'fullName lrn section')
      .sort({ date: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update appointment status
router.put('/appointments/:id', authMiddleware, requireRole('sao'), async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: 'Appointment updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get student records (attendance + appointments)
router.get('/students/:studentId/records', authMiddleware, requireRole('sao'), async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.params.studentId }).sort({ date: -1 });
    const appointments = await Appointment.find({ studentId: req.params.studentId }).sort({ date: -1 });
    
    res.json({ attendance, appointments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
