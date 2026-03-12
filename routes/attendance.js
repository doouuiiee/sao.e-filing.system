// ============================================
// ATTENDANCE ROUTES - Attendance sheet management for Supervisory Committee
// ============================================

const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/auth');
const AttendanceSheet = require('../models/AttendanceSheet');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Create daily attendance sheet (auto-generated)
router.post('/sheet/create', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const { section, subject, date } = req.body;
    
    const student = await Student.findOne({ userId: req.userId });
    
    // Check if student is Supervisory Committee
    if (!student.position || !student.position.includes('Supervisory Committee')) {
      return res.status(403).json({ message: 'Only Supervisory Committee members can create attendance sheets' });
    }
    
    // Get all students in section
    const students = await Student.find({ section });
    
    const records = students.map(s => ({
      studentId: s._id,
      status: 'Present',
      lateMinutes: 0,
      excuseReason: ''
    }));
    
    const sheet = new AttendanceSheet({
      date,
      section,
      subject,
      submittedBy: student._id,
      records
    });
    
    await sheet.save();
    res.json({ message: 'Attendance sheet created', sheet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update attendance sheet
router.put('/sheet/:sheetId', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const { records } = req.body;
    
    const sheet = await AttendanceSheet.findById(req.params.sheetId);
    
    if (sheet.isSubmitted) {
      return res.status(400).json({ message: 'Cannot edit submitted attendance sheet' });
    }
    
    sheet.records = records;
    await sheet.save();
    
    res.json({ message: 'Attendance sheet updated', sheet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit attendance sheet
router.post('/sheet/:sheetId/submit', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const sheet = await AttendanceSheet.findById(req.params.sheetId);
    
    if (sheet.isSubmitted) {
      return res.status(400).json({ message: 'Attendance sheet already submitted' });
    }
    
    // Create individual attendance records
    for (const record of sheet.records) {
      const attendance = new Attendance({
        studentId: record.studentId,
        date: sheet.date,
        subject: sheet.subject,
        section: sheet.section,
        status: record.status,
        lateMinutes: record.lateMinutes,
        excuseReason: record.excuseReason,
        submittedBy: sheet.submittedBy
      });
      await attendance.save();
    }
    
    sheet.isSubmitted = true;
    sheet.submittedAt = new Date();
    await sheet.save();
    
    res.json({ message: 'Attendance sheet submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get attendance sheets for student (Supervisory Committee)
router.get('/sheets', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });
    
    const sheets = await AttendanceSheet.find({ section: student.section })
      .populate('submittedBy', 'fullName')
      .sort({ date: -1 });
    
    res.json(sheets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get attendance sheet by date
router.get('/sheets/date/:date', authMiddleware, requireRole('student'), async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.userId });
    const date = new Date(req.params.date);
    
    const sheets = await AttendanceSheet.find({
      section: student.section,
      date: {
        $gte: new Date(date.setHours(0, 0, 0, 0)),
        $lt: new Date(date.setHours(23, 59, 59, 999))
      }
    }).populate('records.studentId', 'fullName lrn');
    
    res.json(sheets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
