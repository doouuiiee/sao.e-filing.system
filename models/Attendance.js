// ============================================
// ATTENDANCE MODEL - Daily attendance records
// ============================================

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Present', 'Absent', 'Late', 'Excused']
  },
  lateMinutes: {
    type: Number,
    default: 0
  },
  excuseReason: {
    type: String,
    default: ''
  },
  documentationImage: {
    type: String,
    default: ''
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
