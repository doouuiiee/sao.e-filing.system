// ============================================
// SEED STUDENTS - Grade 12 St. Margaret Data
// ============================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Student = require('../models/Student');
const dotenv = require('dotenv');

dotenv.config();

// Grade 12 St. Margaret Students Data
const studentsData = [
  // Male Students
  { lastName: 'Aureo', firstName: 'Jericho James', middleName: '', email: 'jjaureo14@gmail.com', lrn: '2026120001', gender: 'Male' },
  { lastName: 'Basas', firstName: 'Nathan Audley', middleName: 'Cumpio', email: 'nathanaudleycbasas@gmail.com', lrn: '2026120002', gender: 'Male', position: 'Credit Committee: Vice-Chairperson' },
  { lastName: 'Besas', firstName: 'Jhon Alexis', middleName: 'Barcelona', email: 'jhonalexisbesas2007@gmail.com', lrn: '2026120003', gender: 'Male' },
  { lastName: 'Cañete', firstName: 'Shaunt Daniel', middleName: '', email: 'schauntplaysmid@gmail.com', lrn: '2026120004', gender: 'Male' },
  { lastName: 'Cariño', firstName: 'Clark Jerald', middleName: '', email: 'cjgwapower@gmail.com', lrn: '2026120005', gender: 'Male' },
  { lastName: 'Casul', firstName: 'Kirby', middleName: '', email: 'kirbycasul932@gmail.com', lrn: '2026120006', gender: 'Male' },
  { lastName: 'Coretico', firstName: 'Ray Andrew', middleName: '', email: 'rayandrew1083@gmail.com', lrn: '2026120007', gender: 'Male' },
  { lastName: 'Dela Cerna', firstName: 'Aaron', middleName: '', email: 'aarondelacerna4@gmail.com', lrn: '2026120008', gender: 'Male' },
  { lastName: 'Dico', firstName: 'John Riel', middleName: '', email: 'dicojohnriel@gmail.com', lrn: '2026120009', gender: 'Male' },
  { lastName: 'Dignos', firstName: 'Mike Irel', middleName: '', email: 'mikeireldignos12@gmail.com', lrn: '2026120010', gender: 'Male' },
  { lastName: 'Dungog', firstName: 'John Eli', middleName: 'Pasco', email: 'johnelidungog@gmail.com', lrn: '2026120011', gender: 'Male', position: 'Credit Committee: Chairperson' },
  { lastName: 'Evangelista', firstName: 'Steven Ket', middleName: 'Ligan', email: 'stevenket6@gmail.com', lrn: '2026120012', gender: 'Male' },
  { lastName: 'Fernandez', firstName: 'Renz Samuel', middleName: '', email: 'renzsamuel08@gmail.com', lrn: '2026120013', gender: 'Male' },
  { lastName: 'Galve', firstName: 'Ronnie', middleName: '', email: 'rronniecortesgalve@Gmail.com', lrn: '2026120014', gender: 'Male' },
  { lastName: 'Idulsa', firstName: 'Jon Uriel', middleName: 'Aledo', email: 'jonurielidulsa@gmail.com', lrn: '2026120015', gender: 'Male', position: 'Election Committee: Vice-Chairperson' },
  { lastName: 'Igot', firstName: 'James Dominic', middleName: 'Garcia', email: 'doouuiiee@gmail.com', lrn: '2026120016', gender: 'Male', position: 'Board of Directors: Chairperson' },
  { lastName: 'Inoc', firstName: 'Gabriel Lorenz', middleName: '', email: 'Inocgab813@gmail.com', lrn: '2026120017', gender: 'Male' },
  { lastName: 'Limpangog', firstName: 'Kevin Dwayne', middleName: '', email: 'kevinlimpangog9@gmail.com', lrn: '2026120018', gender: 'Male' },
  { lastName: 'Maro', firstName: 'Gerald', middleName: '', email: 'geraldmaro138@gmail.com', lrn: '2026120019', gender: 'Male' },
  { lastName: 'Montebon', firstName: 'Clint Marvin', middleName: 'Busito', email: 'montebonclint7@gmail.com', lrn: '2026120020', gender: 'Male' },
  { lastName: 'Montemayor', firstName: 'Ace Ezekiel Jose', middleName: '', email: 'ajmntmr@gmail.com', lrn: '2026120021', gender: 'Male' },
  { lastName: 'Ochea', firstName: 'Jan Dhilbert', middleName: '', email: 'Ocatjandhilbert@gmail.com', lrn: '2026120022', gender: 'Male' },
  { lastName: 'Pacaldo', firstName: 'Francis Yuan', middleName: '', email: 'yuhanpacaldo@gmail.com', lrn: '2026120023', gender: 'Male' },
  { lastName: 'Rodriguez', firstName: 'Christian Emanuel', middleName: 'Yap', email: 'yapriguez@gmail.com', lrn: '2026120024', gender: 'Male' },
  { lastName: 'Secocher', firstName: 'King Mattew', middleName: '', email: 'kingmattewsecocher@gmail.com', lrn: '2026120025', gender: 'Male' },
  { lastName: 'Serapio', firstName: 'Vince Ethan', middleName: '', email: 'vinzethanserapio@gmail.com', lrn: '2026120026', gender: 'Male' },
  { lastName: 'Signe', firstName: 'James Matthew', middleName: '', email: 'jamesmatthewsigne2008@gmail.com', lrn: '2026120027', gender: 'Male' },
  { lastName: 'Sumagang', firstName: 'John Brent', middleName: '', email: 'johnbrent.sumagang@gmail.com', lrn: '2026120028', gender: 'Male', position: 'Election Committee: Chairperson' },
  { lastName: 'Tiro', firstName: 'EJ Nathaniel', middleName: '', email: 'ejnathanieltiro12@gmail.com', lrn: '2026120029', gender: 'Male', position: 'Board of Directors: Vice-Chairperson' },
  { lastName: 'Tiro', firstName: 'Rheal Sena', middleName: 'Naquila', email: 'rhealsenatiro@gmail.com', lrn: '2026120030', gender: 'Male' },
  { lastName: 'Tura', firstName: 'Neil Ian', middleName: '', email: 'turaneilian16@gmail.com', lrn: '2026120031', gender: 'Male' },
  { lastName: 'Ybañez', firstName: 'Ryan François', middleName: 'Nerona', email: 'ryanfybanezkaon@gmail.com', lrn: '2026120032', gender: 'Male', position: 'Election Committee: Secretary' },
  { lastName: 'Ybañez', firstName: 'Vaughn Andre', middleName: 'Nerona', email: 'aresa0308@gmail.com', lrn: '2026120033', gender: 'Male' },
  // Female Students
  { lastName: 'Aro', firstName: 'Jesabel', middleName: '', email: 'arojesabel108@gmail.com', lrn: '2026120034', gender: 'Female', position: 'Board of Directors: Member' },
  { lastName: 'Berdin', firstName: 'Leigh Anne', middleName: '', email: 'berdinleighanne7@gmail.com', lrn: '2026120035', gender: 'Female', position: 'Board of Directors: Secretary' },
  { lastName: 'Brocal', firstName: 'Rhian Kate', middleName: '', email: 'brocalrhiankate@gmail.com', lrn: '2026120036', gender: 'Female', position: 'Board of Directors: Member' },
  { lastName: 'Estrera', firstName: 'Alyssa Faye', middleName: '', email: 'alyssaestrera08@gmail.com', lrn: '2026120037', gender: 'Female' },
  { lastName: 'Gabato', firstName: 'Juliana Nicole', middleName: 'Gequillo', email: 'julianannicolegabato@gmail.com', lrn: '2026120038', gender: 'Female' },
  { lastName: 'Gimoros', firstName: 'Rheanne', middleName: 'Navarro', email: 'yanyangimoros@gmail.com', lrn: '2026120039', gender: 'Female', position: 'Board of Directors: Member' },
  { lastName: 'Javier', firstName: 'Queshia Lleian', middleName: 'Antiforta', email: 'queshialleianj@gmail.com', lrn: '2026120040', gender: 'Female' },
  { lastName: 'Jawhari', firstName: 'Ashley', middleName: 'Regner', email: 'ashleyjawhari93@gmail.com', lrn: '2026120041', gender: 'Female', position: 'Credit Committee: Secretary' },
  { lastName: 'Jumao-as', firstName: 'Edrich Hanz', middleName: 'Measco', email: 'edrichmjumaoas@gmail.com', lrn: '2026120042', gender: 'Female', position: 'Board of Directors: Member' },
  { lastName: 'Ligan', firstName: 'Ella Katrina', middleName: '', email: 'liganellakatrina@gmail.com', lrn: '2026120043', gender: 'Female' },
  { lastName: 'Mag-aso', firstName: 'Kishan', middleName: '', email: 'magaso.kishan28@gmail.com', lrn: '2026120044', gender: 'Female', position: 'Supervisory Committee: Vice-Chairperson' },
  { lastName: 'Minguito', firstName: 'Honey Jed', middleName: '', email: 'mhoneyjed@gmail.com', lrn: '2026120045', gender: 'Female' },
  { lastName: 'Morales', firstName: 'Kennice Ashnee', middleName: 'Montemayor', email: 'ashneemorales@gmail.com', lrn: '2026120046', gender: 'Female' },
  { lastName: 'Pepito', firstName: 'Jeah Mae', middleName: 'Prak', email: 'jemieeprak@gmail.com', lrn: '2026120047', gender: 'Female' },
  { lastName: 'Pogoy', firstName: 'O\'Hara Faith', middleName: '', email: 'faithohara340@gmail.com', lrn: '2026120048', gender: 'Female', position: 'Supervisory Committee: Secretary' },
  { lastName: 'Sanchez', firstName: 'Teffany Allea', middleName: 'Pogoy', email: 'teffanyalleasanchez70@gmail.com', lrn: '2026120049', gender: 'Female' },
  { lastName: 'Tampus', firstName: 'Rizzele Nathalie Jane', middleName: '', email: 'tampusrizzele08@icloud.com', lrn: '2026120050', gender: 'Female', position: 'Muse' },
  { lastName: 'Yagonia', firstName: 'Precious Phoebe Lynn', middleName: '', email: 'vnmcreft@gmail.com', lrn: '2026120051', gender: 'Female', position: 'Supervisory Committee: Chairperson' }
];

const PASSWORD = 'MARG1201';

// Subjects for Grade 12 St. Margaret
const subjects1stSem = [
  { subjectName: 'Esp/CL/COOPEd', teacher: 'Mrs. Ruby Z. Nuñez', semester: '1st Sem' },
  { subjectName: 'Personal Development (PerDev)', teacher: 'Ms. Dorres J. Nacua', semester: '1st Sem' },
  { subjectName: 'Practical Research 2 (PR2)', teacher: 'Mrs. Noemie B. Cañete', semester: '1st Sem' },
  { subjectName: 'Contemporary Philippine Arts from the Regions (CPAR)', teacher: 'Ms. Cherrie Mae Sumagang', semester: '1st Sem' },
  { subjectName: 'General Chemistry 1 (GenChem1)', teacher: 'Mr. Emmanuel Inoc Jr.', semester: '1st Sem' },
  { subjectName: 'English for Academic and Professional Purposes (EFAPP)', teacher: 'Mrs. Lee Ann T. Tiro', semester: '1st Sem' },
  { subjectName: 'Pagsulat ng Filipino sa Piling Larangan (PFPL)', teacher: 'Mr. Jeffrey S. Arong', semester: '1st Sem' },
  { subjectName: 'General Physics 1 (GenPhy1)', teacher: 'Mr. Charles L. Tañares', semester: '1st Sem' },
  { subjectName: 'Physical Education and Health 12 (PEH12)', teacher: 'Ms. Jehan Sullano Tantay', semester: '1st Sem' }
];

const subjects2ndSem = [
  { subjectName: 'Esp/CL/COOPEd', teacher: 'Mrs. Ruby Z. Nuñez', semester: '2nd Sem' },
  { subjectName: 'Capstone Project', teacher: 'Mrs. Kristelyn I. Ventura', semester: '2nd Sem' },
  { subjectName: 'Entrepreneurship (Entrep)', teacher: 'Ms. Cherrie Mae Sumagang', semester: '2nd Sem' },
  { subjectName: 'General Chemistry 2 (GenChem2)', teacher: 'Mr. Emmanuel Inoc Jr.', semester: '2nd Sem' },
  { subjectName: 'Empowerment Technology (E-Tech)', teacher: 'Mrs. Lee Ann T. Tura', semester: '2nd Sem' },
  { subjectName: 'Work Immersion', teacher: 'Mr. Jeffrey S. Arong', semester: '2nd Sem' },
  { subjectName: 'General Physics 2 (GenPhy2)', teacher: 'Mr. Charles L. Tañares', semester: '2nd Sem' },
  { subjectName: 'Physical Education and Health 12 (PEH12)', teacher: 'Ms. Jehan S. Tantay', semester: '2nd Sem' }
];

async function seedStudents() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const studentData of studentsData) {
      // Check if student already exists
      const existingStudent = await Student.findOne({ lrn: studentData.lrn });
      if (existingStudent) {
        console.log(`Student ${studentData.firstName} ${studentData.lastName} already exists`);
        continue;
      }

      // Create user account
      const user = new User({
        email: studentData.email,
        password: PASSWORD,
        role: 'student'
      });
      await user.save();

      // Create student profile
      const fullName = `${studentData.lastName}, ${studentData.firstName}${studentData.middleName ? ' ' + studentData.middleName : ''}`;
      
      const student = new Student({
        userId: user._id,
        lrn: studentData.lrn,
        lastName: studentData.lastName,
        firstName: studentData.firstName,
        middleName: studentData.middleName,
        fullName: fullName,
        gradeLevel: 'Grade 12',
        section: 'St. Margaret',
        sectionPin: '0121',
        strand: 'STEM (Science Technology Engineering and Mathematics)',
        gender: studentData.gender,
        status: 'Active',
        position: studentData.position || '',
        subjects: [...subjects1stSem, ...subjects2ndSem],
        parentGuardian: {
          lastName: 'Parent',
          firstName: 'Guardian',
          middleName: '',
          fullName: 'Parent Guardian',
          email: `parent.${studentData.lrn}@email.com`,
          contactNumber: '09123456789',
          relationship: 'Mother',
          homeAddress: 'Cordova, Cebu',
          parentalConsent: true
        }
      });

      await student.save();
      console.log(`✅ Created: ${fullName} (${studentData.lrn})`);
    }

    console.log('\n🎉 All students seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding students:', error);
    process.exit(1);
  }
}

seedStudents();
