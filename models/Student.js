// ============================================
// STUDENT MODEL - Student profile and information
// ============================================

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lrn: {
    type: String,
    required: true,
    unique: true
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
  gradeLevel: {
    type: String,
    required: true,
    enum: ['Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']
  },
  section: {
    type: String,
    required: true
  },
  sectionPin: {
    type: String,
    required: true
  },
  strand: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  position: {
    type: String,
    default: ''
  },
  subjects: [{
    subjectName: String,
    teacher: String,
    semester: String
  }],
  parentGuardian: {
    lastName: String,
    firstName: String,
    middleName: String,
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    contactNumber: {
      type: String,
      required: true
    },
    relationship: {
      type: String,
      required: true,
      enum: ['Mother', 'Father', 'Guardian']
    },
    homeAddress: {
      type: String,
      required: true
    },
    parentalConsent: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);
