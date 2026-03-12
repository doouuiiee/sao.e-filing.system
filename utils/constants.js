// ============================================
// CONSTANTS - Violation and Attendance Categories
// ============================================

const VIOLATION_CATEGORIES = [
  'Academic Dishonesty: Cheating, plagiarism, or unauthorized collaboration',
  'Behavioral Misconduct: Defiance, disrespect to staff, profanity, or disrupting the learning environment',
  'Physical Violence & Aggression: Fighting, assault on students or staff, or intimidation',
  'Bullying & Harassment: Physical, psychological, or sexual harassment, including cyberbullying',
  'Substance Use & Possession: Possession or usage of drugs, alcohol, or tobacco/vaping products',
  'Vandalism & Theft: Damaging school property or stealing personal property',
  'Weapons Violation: Possession of firearms, knives, or other dangerous items',
  'Attendance Issues: Chronic absenteeism, truancy, skipping class, or tardiness',
  'Policy Violations: Violating dress codes, using prohibited technology, or gambling'
];

const ATTENDANCE_MATTER_CATEGORIES = [
  '3x Late',
  '5x Late',
  '3x Absent',
  '5x Absent'
];

module.exports = {
  VIOLATION_CATEGORIES,
  ATTENDANCE_MATTER_CATEGORIES
};
