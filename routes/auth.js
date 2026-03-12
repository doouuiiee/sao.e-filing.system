// ============================================
// AUTH ROUTES - Registration and Login
// ============================================

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const sectionData = require('../utils/sectionData');

// Register Student
router.post('/register/student', async (req, res) => {
  try {
    const {
      email, password, lrn, fullName, gradeLevel, section, gender,
      parentFullName, parentEmail, parentContactNumber, parentRelationship,
      parentHomeAddress, parentalConsent
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Check if LRN already exists
    const existingLRN = await Student.findOne({ lrn });
    if (existingLRN) {
      return res.status(400).json({ message: 'LRN already registered' });
    }

    // Get section pin and strand
    let sectionPin = '';
    let strand = '';
    
    const gradeData = sectionData[gradeLevel];
    if (gradeData) {
      const sectionInfo = gradeData.sections.find(s => s.name === section);
      if (sectionInfo) {
        sectionPin = sectionInfo.pin;
        strand = sectionInfo.strand || '';
      }
    }

    // Create user
    const user = new User({
      email,
      password,
      role: 'student'
    });
    await user.save();

    // Create student profile
    const student = new Student({
      userId: user._id,
      lrn,
      fullName,
      gradeLevel,
      section,
      sectionPin,
      strand,
      gender,
      parentGuardian: {
        fullName: parentFullName,
        email: parentEmail,
        contactNumber: parentContactNumber,
        relationship: parentRelationship,
        homeAddress: parentHomeAddress,
        parentalConsent
      }
    });
    await student.save();

    res.status(201).json({ message: 'Student registered successfully', studentId: student._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register Teacher
router.post('/register/teacher', async (req, res) => {
  try {
    const { email, password, fullName, advisorySection, office } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user
    const user = new User({
      email,
      password,
      role: office === 'Students Affairs Office (SAO)' ? 'sao' : 'teacher'
    });
    await user.save();

    // Create teacher profile
    const teacher = new Teacher({
      userId: user._id,
      fullName,
      advisorySection: advisorySection || '',
      office
    });
    await teacher.save();

    res.status(201).json({ message: 'Teacher registered successfully', teacherId: teacher._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? '30d' : '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists or not for security
      return res.json({ message: 'If an account exists, a password reset email will be sent.' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Create reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password.html?token=${resetToken}`;

    // Send email (using your email service)
    const emailService = require('../utils/emailService');
    await emailService.sendPasswordResetEmail(user.email, resetLink);

    res.json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
