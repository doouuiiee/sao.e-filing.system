// ============================================
// ATTENDANCE SHEET MODEL - Daily attendance sheets for Supervisory Committee
// ============================================

const mongoose = require('mongoose');

const attendanceSheetSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  records: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student'
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late', 'Excused']
    },
    lateMinutes: {
      type: Number,
      default: 0
    },
    excuseReason: {
      type: String,
      default: ''
    }
  }],
  isSubmitted: {
    type: Boolean,
    default: false
  },
  submittedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AttendanceSheet', attendanceSheetSchema);
