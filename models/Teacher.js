// ============================================
// TEACHER MODEL - Teacher profile and information
// ============================================

const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String,
    default: ''
  },
  fullName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  advisorySection: {
    type: String,
    default: ''
  },
  office: {
    type: String,
    required: true,
    enum: [
      'Admin Office', 'Bursar', 'Isolation Room', 'Tech Hub', 'Registrar',
      'TLE 1', 'TLE 2', 'Clinic', 'Canteen', 'MAPEH Room', 'Guidance Office',
      'Students Affairs Office (SAO)', 'Faculty', 'Science Laboratory 1',
      'Science Laboratory 2', 'Library Main', 'Library Extension', 'Computer Laboratory'
    ]
  },
  subjectsHandled: [{
    subjectName: String,
    section: String,
    gradeLevel: String,
    semester: String,
    background: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
