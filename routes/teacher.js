// ============================================
// TEACHER ROUTES - Teacher profile and masterlist management
// ============================================

const express = require('express');
const router = express.Router();
const { authMiddleware, requireRole } = require('../middleware/auth');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');

// Get teacher profile
router.get('/profile', authMiddleware, requireRole('teacher', 'sao'), async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.userId }).populate('userId', 'email profilePicture');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher profile not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get masterlist (students in advisory section)
router.get('/masterlist', authMiddleware, requireRole('teacher', 'sao'), async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.userId });
    if (!teacher.advisorySection) {
      return res.json([]);
    }
    
    const students = await Student.find({ section: teacher.advisorySection }).populate('userId', 'email profilePicture');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add subject
router.post('/subjects', authMiddleware, requireRole('teacher', 'sao'), async (req, res) => {
  try {
    const { subjectName, section, background } = req.body;
    const teacher = await Teacher.findOne({ userId: req.userId });
    
    teacher.subjectsHandled.push({ subjectName, section, background: background || '' });
    await teacher.save();
    
    res.json({ message: 'Subject added successfully', subjects: teacher.subjectsHandled });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove subject
router.delete('/subjects/:subjectId', authMiddleware, requireRole('teacher', 'sao'), async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.userId });
    teacher.subjectsHandled = teacher.subjectsHandled.filter(
      s => s._id.toString() !== req.params.subjectId
    );
    await teacher.save();
    
    res.json({ message: 'Subject removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Assign class officer position
router.put('/assign-officer', authMiddleware, requireRole('teacher', 'sao'), async (req, res) => {
  try {
    const { studentId, position } = req.body;
    
    await Student.findByIdAndUpdate(studentId, { position });
    
    res.json({ message: 'Officer position assigned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get students by subject
router.get('/subjects/:subjectName/students', authMiddleware, requireRole('teacher', 'sao'), async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.userId });
    const subject = teacher.subjectsHandled.find(s => s.subjectName === req.params.subjectName);
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    
    const students = await Student.find({ section: subject.section });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get attendance for subject
router.get('/subjects/:subjectName/attendance', authMiddleware, requireRole('teacher', 'sao'), async (req, res) => {
  try {
    const attendance = await Attendance.find({ subject: req.params.subjectName })
      .populate('studentId', 'fullName lrn')
      .sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
