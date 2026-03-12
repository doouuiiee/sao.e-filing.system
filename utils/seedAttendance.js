// ============================================
// SEED ATTENDANCE - Grade 12 St. Margaret Attendance Data
// ============================================

const mongoose = require('mongoose');
const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const dotenv = require('dotenv');

dotenv.config();

// Attendance data parsed from the records
const attendanceData = {
  absences: {
    'Ybañez, Vaughn Andre': [
      { date: '2025-07-02', excused: false },
      { date: '2025-07-16', excused: true },
      { date: '2025-07-21', excused: false },
      { date: '2025-07-22', excused: false },
      { date: '2025-07-29', excused: false },
      { date: '2025-07-30', excused: false },
      { date: '2025-08-04', excused: false },
      { date: '2025-08-11', excused: false },
      { date: '2025-09-01', excused: false },
      { date: '2025-09-03', excused: false },
      { date: '2025-09-15', excused: false },
      { date: '2025-09-23', excused: false },
      { date: '2026-01-26', excused: false }
    ],
    'Javier, Queshia Lleian': [
      { date: '2025-07-02', excused: false },
      { date: '2025-07-03', excused: false },
      { date: '2025-07-24', excused: false },
      { date: '2025-08-18', excused: false },
      { date: '2025-09-01', excused: false },
      { date: '2025-09-15', excused: false },
      { date: '2026-02-26', excused: false },
      { date: '2026-03-02', excused: false }
    ],
    'Fernandez, Renz Samuel': [
      { date: '2025-07-04', excused: false },
      { date: '2025-07-07', excused: true },
      { date: '2025-07-30', excused: false },
      { date: '2025-08-18', excused: false },
      { date: '2025-09-01', excused: false },
      { date: '2025-09-02', excused: false },
      { date: '2025-09-15', excused: false },
      { date: '2025-09-16', excused: false },
      { date: '2025-09-17', excused: false },
      { date: '2025-11-06', excused: false },
      { date: '2026-01-07', excused: false }
    ],
    'Tiro, Rheal Sena': [
      { date: '2025-07-08', excused: true },
      { date: '2025-07-15', excused: false },
      { date: '2025-07-16', excused: true },
      { date: '2025-08-18', excused: false },
      { date: '2026-01-12', excused: false },
      { date: '2026-02-26', excused: false }
    ],
    'Cariño, Clark Jerald': [
      { date: '2025-07-09', excused: false },
      { date: '2025-07-16', excused: true },
      { date: '2025-07-21', excused: true },
      { date: '2025-07-23', excused: false },
      { date: '2025-07-24', excused: false },
      { date: '2025-08-05', excused: false },
      { date: '2025-08-07', excused: false },
      { date: '2025-09-03', excused: false },
      { date: '2025-09-15', excused: false },
      { date: '2025-09-23', excused: false },
      { date: '2025-09-24', excused: false },
      { date: '2025-11-12', excused: false },
      { date: '2026-01-12', excused: false },
      { date: '2026-01-13', excused: false },
      { date: '2026-01-28', excused: false },
      { date: '2026-02-04', excused: false },
      { date: '2026-02-26', excused: false },
      { date: '2026-03-02', excused: false }
    ],
    'Aureo, Jericho James': [
      { date: '2025-07-07', excused: true },
      { date: '2025-09-03', excused: false },
      { date: '2025-11-06', excused: false }
    ],
    'Casul, Kirby': [
      { date: '2025-07-22', excused: false }
    ],
    'Dela Cerna, Aaron': [
      { date: '2025-07-22', excused: false },
      { date: '2025-11-06', excused: false },
      { date: '2026-01-28', excused: false },
      { date: '2026-02-04', excused: false }
    ],
    'Cañete, Shaunt Daniel': [
      { date: '2025-07-16', excused: false },
      { date: '2025-07-22', excused: false },
      { date: '2025-07-24', excused: false },
      { date: '2025-09-03', excused: false },
      { date: '2026-01-07', excused: false },
      { date: '2026-02-26', excused: false },
      { date: '2026-03-02', excused: false }
    ],
    'Estrera, Alyssa Faye': [
      { date: '2025-07-23', excused: false },
      { date: '2025-09-03', excused: false },
      { date: '2026-03-03', excused: false }
    ],
    'Secocher, King Mattew': [
      { date: '2025-07-23', excused: false },
      { date: '2025-09-02', excused: false },
      { date: '2025-09-03', excused: false },
      { date: '2026-01-28', excused: false },
      { date: '2026-03-03', excused: false }
    ],
    'Galve, Ronnie': [
      { date: '2025-07-29', excused: false },
      { date: '2025-09-23', excused: false },
      { date: '2025-09-24', excused: false },
      { date: '2025-09-30', excused: false }
    ],
    'Inoc, Gabriel Lorenz': [
      { date: '2025-08-07', excused: true }
    ],
    'Maro, Gerald': [
      { date: '2025-08-11', excused: false },
      { date: '2026-01-26', excused: false },
      { date: '2026-02-04', excused: false }
    ],
    'Tura, Neil Ian': [
      { date: '2025-08-11', excused: false },
      { date: '2026-01-12', excused: false },
      { date: '2026-02-26', excused: false }
    ],
    'Dignos, Mike Irel': [
      { date: '2025-08-18', excused: false }
    ],
    'Gimoros, Rheanne': [
      { date: '2025-08-18', excused: false },
      { date: '2026-01-07', excused: false }
    ],
    'Besas, Jhon Alexis': [
      { date: '2025-09-01', excused: false },
      { date: '2025-09-24', excused: false },
      { date: '2026-01-07', excused: false },
      { date: '2026-01-26', excused: false },
      { date: '2026-03-02', excused: false }
    ],
    'Ybañez, Ryan François': [
      { date: '2025-09-03', excused: false }
    ],
    'Signe, James Matthew': [
      { date: '2025-09-02', excused: false },
      { date: '2025-11-06', excused: false },
      { date: '2026-01-26', excused: false },
      { date: '2026-03-03', excused: false }
    ],
    'Evangelista, Steven Ket': [
      { date: '2025-09-16', excused: false },
      { date: '2025-09-17', excused: false }
    ],
    'Rodriguez, Christian Emanuel': [
      { date: '2025-09-23', excused: false },
      { date: '2025-09-24', excused: false },
      { date: '2025-11-06', excused: false },
      { date: '2026-03-02', excused: false }
    ],
    'Tampus, Rizelle Nathalie Jane': [
      { date: '2025-09-24', excused: false },
      { date: '2026-01-26', excused: false },
      { date: '2026-02-26', excused: false },
      { date: '2026-03-02', excused: false }
    ],
    'Serapio, Vince Ethan': [
      { date: '2025-09-30', excused: false },
      { date: '2026-01-26', excused: false },
      { date: '2026-03-02', excused: false }
    ],
    'Jumao-as, Edrich Hanz': [
      { date: '2025-11-06', excused: false }
    ],
    'Idulsa, Jon Uriel': [
      { date: '2026-01-07', excused: false },
      { date: '2026-01-27', excused: false },
      { date: '2026-01-28', excused: false }
    ],
    'Mag-aso, Kishan': [
      { date: '2026-01-07', excused: false }
    ],
    'Minguito, Honey Jed': [
      { date: '2026-01-12', excused: false }
    ],
    'Sanchez, Teffany Allea': [
      { date: '2026-01-12', excused: false }
    ],
    'Sumagang, John Brent': [
      { date: '2026-01-26', excused: false }
    ],
    'Jawhari, Ashley': [
      { date: '2026-01-26', excused: false }
    ],
    'Ligan, Ella Katrina': [
      { date: '2026-01-27', excused: false },
      { date: '2026-01-28', excused: false }
    ]
  },
  lates: {
    'Cariño, Clark Jerald': [
      '2025-07-08', '2025-07-09', '2025-07-16', '2025-07-17', '2025-08-04',
      '2025-09-17', '2025-09-30', '2026-01-07', '2026-01-26'
    ],
    'Fernandez, Renz Samuel': [
      '2025-07-09', '2025-07-23', '2025-08-04', '2025-09-04', '2025-09-30',
      '2026-01-13', '2026-03-03'
    ],
    'Cañete, Shaunt Daniel': [
      '2025-07-02', '2025-07-04', '2025-07-08', '2025-07-15', '2025-07-16',
      '2025-07-17', '2025-07-21', '2025-07-22', '2025-07-28', '2025-08-04',
      '2025-08-11', '2025-08-18', '2025-09-04', '2025-11-06', '2026-01-07',
      '2026-01-13', '2026-01-26', '2026-01-27', '2026-01-28', '2026-02-04',
      '2026-03-03'
    ],
    'Galve, Ronnie': [
      '2025-07-02', '2025-07-16', '2025-07-21', '2025-07-23', '2025-07-29',
      '2025-07-31', '2025-08-05', '2025-08-18', '2025-09-04', '2025-09-16',
      '2026-01-07'
    ],
    'Ybañez, Vaughn Andre': [
      '2025-07-04', '2025-07-08', '2025-07-15', '2025-07-17', '2025-07-21',
      '2025-08-05', '2025-08-18', '2025-09-04', '2025-09-16', '2025-09-24',
      '2025-11-06', '2026-01-06', '2026-02-04', '2026-02-26', '2026-03-02',
      '2026-03-03'
    ],
    'Tura, Neil Ian': [
      '2025-07-08', '2025-08-05', '2026-01-27', '2026-01-28', '2026-02-04'
    ],
    'Maro, Gerald': [
      '2025-07-08', '2025-08-05', '2025-09-24', '2026-01-27', '2026-01-28'
    ],
    'Aureo, Jericho James': [
      '2025-07-15', '2025-08-05', '2025-08-11', '2025-09-01', '2025-09-03',
      '2025-09-04', '2025-09-16', '2025-09-23', '2025-09-24', '2026-01-07',
      '2026-01-26', '2026-01-27', '2026-01-28'
    ],
    'Estrera, Alyssa Faye': [
      '2025-07-15', '2025-07-16', '2025-07-24', '2026-01-07', '2026-02-04',
      '2026-02-26'
    ],
    'Evangelista, Steven Ket': [
      '2025-07-15', '2025-07-17', '2025-07-30', '2025-08-05', '2025-08-18',
      '2025-09-01', '2026-02-04', '2026-03-03'
    ],
    'Ybañez, Ryan François': [
      '2025-07-16', '2025-07-31', '2025-08-05', '2025-09-04', '2025-09-23',
      '2025-09-24', '2026-02-04', '2026-02-26'
    ],
    'Secocher, King Mattew': [
      '2025-07-16', '2025-07-24', '2025-08-18', '2026-01-07', '2026-02-04',
      '2026-02-26'
    ],
    'Idulsa, Jon Uriel': [
      '2025-07-17', '2025-07-23', '2025-07-30', '2025-08-04', '2025-08-07',
      '2025-08-09', '2025-08-11', '2025-09-17', '2025-09-24', '2025-11-06',
      '2026-01-26', '2026-02-26'
    ],
    'Besas, Jhon Alexis': [
      '2025-07-21', '2025-08-04', '2025-09-16', '2025-09-23', '2025-09-30',
      '2026-02-04', '2026-02-26'
    ],
    'Tiro, Rheal Sena': [
      '2025-07-22', '2025-07-31', '2026-01-07', '2026-02-26'
    ],
    'Tampus, Rizelle Nathalie Jane': [
      '2025-07-23', '2025-08-04', '2025-08-11', '2025-09-01', '2025-09-16',
      '2025-09-23', '2025-09-30', '2026-01-27', '2026-01-28', '2026-02-04'
    ],
    'Ochea, Jan Dhilbert': [
      '2025-08-04', '2025-08-18', '2025-09-24', '2025-11-06', '2026-01-27',
      '2026-01-28', '2026-02-26', '2026-03-02', '2026-03-03'
    ],
    'Mag-aso, Kishan': ['2025-08-04'],
    'Signe, James Matthew': ['2025-08-11', '2026-01-28', '2026-02-04'],
    'Sumagang, John Brent': ['2025-08-11'],
    'Yagonia, Precious Phoebe Lynn': ['2025-08-11', '2026-03-03'],
    'Berdin, Leigh Anne': ['2025-09-01', '2026-02-04'],
    'Inoc, Gabriel Lorenz': ['2025-09-03', '2026-02-04', '2026-02-26'],
    'Tiro, EJ Nathaniel': [
      '2025-09-16', '2025-09-30', '2025-11-06', '2026-01-07', '2026-02-04',
      '2026-03-02', '2026-03-03'
    ],
    'Basas, Nathan Audley': ['2025-09-24', '2026-01-07'],
    'Igot, James Dominic': ['2025-09-24'],
    'Aro, Jesabel': ['2025-09-24'],
    'Ligan, Ella Katrina': ['2025-09-24', '2026-02-04', '2026-02-26'],
    'Brocal, Rhian Kate': ['2025-09-24', '2026-02-04'],
    'Dignos, Mike Irel': ['2025-09-24'],
    'Dela Cerna, Aaron': [
      '2025-09-24', '2026-01-13', '2026-01-26', '2026-02-04', '2026-03-03'
    ],
    'Gimoros, Rheanne': ['2025-09-24'],
    'Dico, John Riel': ['2026-01-07'],
    'Casul, Kirby': ['2026-01-26', '2026-01-27', '2026-01-28', '2026-02-04'],
    'Jumao-as, Edrich Hanz': ['2026-01-27', '2026-01-28', '2026-03-03'],
    'Coretico, Ray Andrew': ['2026-02-04'],
    'Serapio, Vince Ethan': ['2026-02-04', '2026-02-26'],
    'Gabato, Juliana Nicole': ['2026-02-04'],
    'Jawhari, Ashley': ['2026-02-04'],
    'Limpangog, Kevin Dwayne': ['2026-02-26'],
    'Minguito, Honey Jed': ['2026-02-26']
  }
};

async function seedAttendance() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing attendance for Grade 12 St. Margaret
    const students = await Student.find({ section: 'St. Margaret', gradeLevel: 'Grade 12' });
    const studentIds = students.map(s => s._id);
    await Attendance.deleteMany({ studentId: { $in: studentIds } });
    console.log('Cleared existing attendance records');

    let totalRecords = 0;

    // Seed absences
    for (const [fullName, absenceRecords] of Object.entries(attendanceData.absences)) {
      const student = students.find(s => s.fullName.includes(fullName.split(',')[0]));
      if (!student) {
        console.log(`⚠️  Student not found: ${fullName}`);
        continue;
      }

      for (const record of absenceRecords) {
        const attendance = new Attendance({
          studentId: student._id,
          date: new Date(record.date),
          subject: 'General',
          section: 'St. Margaret',
          status: record.excused ? 'Excused' : 'Absent',
          excuseReason: record.excused ? 'Excused absence' : '',
          submittedBy: student._id
        });
        await attendance.save();
        totalRecords++;
      }
    }

    // Seed lates
    for (const [fullName, lateDates] of Object.entries(attendanceData.lates)) {
      const student = students.find(s => s.fullName.includes(fullName.split(',')[0]));
      if (!student) {
        console.log(`⚠️  Student not found: ${fullName}`);
        continue;
      }

      for (const dateStr of lateDates) {
        const attendance = new Attendance({
          studentId: student._id,
          date: new Date(dateStr),
          subject: 'General',
          section: 'St. Margaret',
          status: 'Late',
          lateMinutes: 15,
          submittedBy: student._id
        });
        await attendance.save();
        totalRecords++;
      }
    }

    console.log(`\n✅ Seeded ${totalRecords} attendance records successfully!`);
    console.log('\n📊 Summary:');
    console.log(`   - Students with 5+ lates (Parent Notice): Check dashboard`);
    console.log(`   - Students with 3+ absences (Parent Notice): Check dashboard`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding attendance:', error);
    process.exit(1);
  }
}

seedAttendance();
