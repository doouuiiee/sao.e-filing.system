# 📚 Complete Documentation
## SAO E-Record Filing System - Cordova Catholic School

---

## 🎯 System Overview

The SAO E-Record Filing System is a comprehensive web-based application designed for Cordova Catholic School Multipurpose Cooperative to manage student attendance, appointments, and disciplinary records.

### Key Features
- Multi-role authentication (Student, Teacher, SAO Coordinator)
- Automated email notifications
- Attendance tracking and reporting
- Appointment scheduling
- Class officer management
- Section-based organization
- Parent/Guardian integration

---

## 👥 User Roles & Capabilities

### 1. STUDENT (Regular Student)

**Registration Requirements:**
- LRN (Learner Reference Number)
- Full Name (Last Name, First Name, Middle Name)
- Grade Level (7-12)
- Section (Saint names)
- Strand (Auto-filled for Grade 11-12)
- Email
- Password
- Gender
- Parent/Guardian Information:
  - Full Name
  - Email
  - Contact Number
  - Relationship (Mother/Father/Guardian)
  - Home Address
  - Parental Consent (checkbox)

**Dashboard Features:**
- **Profile Page:**
  - View personal information
  - Upload profile picture
  - View assigned position (if class officer)
  - Calendar for appointments (red=violations, yellow=attendance)

- **Dashboard:**
  - Semestral summary cards:
    - Total Records
    - Absences
    - Late
    - Excused
    - Cutting Classes
  - Attendance graphs

- **Documentation:**
  - Upload excuse slips
  - View documentation history
  - Date-based filtering

- **Classes:**
  - View all enrolled subjects
  - Subject cards showing:
    - Subject name
    - Section
    - Attendance records (Date, Status)
  - Click subject to view detailed attendance

- **Attendance Sheet** (Supervisory Committee Only):
  - Create daily attendance sheets
  - Mark students: Present, Absent, Late (minutes), Excused (reason)
  - Submit at end of period
  - View-only after submission
  - Calendar view of past submissions

**Notifications Received:**
- Violation notices
- Attendance matter notices
- Appointment schedules
- Reschedule confirmations

---

### 2. TEACHER (Staff)

**Registration Requirements:**
- Full Name
- Email
- Password
- Advisory Section (Optional - dropdown of all sections)
- Office (Required - dropdown):
  - Admin Office
  - Bursar
  - Isolation Room
  - Tech Hub
  - Registrar
  - TLE 1, TLE 2
  - Clinic
  - Canteen
  - MAPEH Room
  - Guidance Office
  - Students Affairs Office (SAO)
  - Faculty
  - Science Laboratory 1, 2
  - Library Main, Extension
  - Computer Laboratory

**Dashboard Features:**
- **Profile Page:**
  - View personal information
  - Upload profile picture
  - View advisory section
  - View office assignment
  - Calendar for appointments

- **Dashboard:**
  - Section semestral summary
  - Graphs showing:
    - Attendance trends
    - Late patterns
    - Absence rates
  - Statistics cards:
    - Total students
    - Absences
    - Late
    - Excused

- **Masterlist:**
  - View all students in advisory section
  - Table showing:
    - LRN
    - Full Name
    - Gender
    - Position (if officer)
  - Search functionality
  - Export options

- **Subjects Handled:**
  - Add new subjects:
    - Subject Name
    - Section
    - Background image (optional)
  - View subject cards
  - Click subject to see:
    - All students in that section
    - Attendance records per student
    - Date-based filtering
  - Remove subjects

- **Class Officers:**
  - Assign positions:
    - **Board of Directors:**
      - Chairperson
      - Vice-Chairperson
      - Secretary
      - 4 Members
    - **Supervisory Committee:**
      - Chairperson
      - Vice-Chairperson
      - Secretary
    - **Credit Committee:**
      - Chairperson
      - Vice-Chairperson
      - Secretary
    - **Election Committee:**
      - Chairperson
      - Vice-Chairperson
      - Secretary
  - Search students from masterlist
  - Auto-update student profiles

**Notifications Received:**
- Student violation notices (for advisees)
- Attendance matter notices (for advisees)
- Appointment schedules (for advisees)

---

### 3. SAO COORDINATOR

**Automatic Assignment:**
- Teachers who select "Students Affairs Office (SAO)" as office become SAO Coordinators

**Dashboard Features:**
- **Profile Page:**
  - Same as teacher profile
  - Shows SAO Coordinator role

- **Dashboard:**
  - Overview statistics:
    - Total students (all sections)
    - Pending appointments
    - Total violations
    - Attendance issues
  - School-wide graphs

- **Section Folders:**
  - View all sections organized by grade
  - Each folder shows:
    - Section name
    - Number of students
    - Quick access to records
  - Click folder to see:
    - All students in section
    - Individual student records
    - Attendance history
    - Appointment history

- **Appointments:**
  - View all appointments table:
    - Student name
    - Type (Violation/Attendance Matter)
    - Reason
    - Date & Time
    - Status (Pending/Cancelled/Rescheduled/Done)
  - Filter by status
  - Update appointment status
  - Cannot edit "Done" appointments

- **Send Notifications:**
  - Create new appointment form:
    - Search student (by name or LRN)
    - Select type:
      - Violation
      - Attendance Matter
    - Enter reason
    - Set date and time
  - Automatically sends 3 emails:
    1. To student
    2. To parent/guardian
    3. To class adviser
  - Different templates for violations vs attendance

**Special Capabilities:**
- Access all student records
- Send disciplinary emails
- Manage appointments across all sections
- View school-wide statistics

---

## 📧 Email Notification System

### Email Templates

#### 1. Student - Violation
**Subject:** Notice of Violation and Scheduled Meeting

**Content:**
- Violation type
- Appointment date, time, location
- Mandatory attendance notice
- Reschedule option
- Consequences warning

#### 2. Student - Attendance Matter
**Subject:** Attendance Concern Notification

**Content:**
- Attendance concern details
- Appointment date, time, location
- Request to bring documents
- Reschedule option

#### 3. Parent/Guardian - Violation
**Subject:** Notice of Student Violation and Scheduled Meeting

**Content:**
- Child's violation details
- Appointment information
- Encouragement for parent presence
- Reschedule option
- Cooperation request

#### 4. Parent/Guardian - Attendance Matter
**Subject:** Attendance Concern Notification

**Content:**
- Child's attendance concern
- Appointment information
- Document requirements
- Reschedule option

#### 5. Class Adviser - Violation
**Subject:** Student Violation Notification – For Your Information

**Content:**
- Advisee's name
- Violation details
- Appointment information
- Monitoring purpose notice

#### 6. Class Adviser - Attendance Matter
**Subject:** Attendance Matter Recorded – For Monitoring

**Content:**
- Advisee's name
- Attendance concern
- Appointment information
- Guidance request

### Email Configuration
- Sender: sao.digital.records@gmail.com
- Service: Gmail SMTP
- Authentication: App Password
- HTML formatted emails
- Professional styling

---

## 🏫 School Structure

### Grade Levels & Sections

**Grade 7 (Junior High):**
- St. Anthony (PIN: 0017)
- St. Elizabeth (PIN: 0027)
- St. Francis (PIN: 0037)
- St. Joseph (PIN: 0047)
- St. Michael (PIN: 0057)
- St. Roque (PIN: 0067)
- St. Thomas (PIN: 0077)

**Grade 8 (Junior High):**
- St. Andrew (PIN: 0018)
- St. Jude (PIN: 0028)
- St. Lorenzo (PIN: 0038)
- St. Martin (PIN: 0048)
- St. Paul (PIN: 0058)
- St. Peter (PIN: 0068)

**Grade 9 (Junior High):**
- St Agnes (PIN: 0019)
- St. Anne (PIN: 0029)
- St. Bernadette (PIN: 0039)
- St. Bridget (PIN: 0049)
- St. Monica (PIN: 0059)
- St. Therese (PIN: 0069)

**Grade 10 (Junior High):**
- St. Benedict (PIN: 0101)
- St. John (PIN: 0102)
- St. Luke (PIN: 0103)
- St. Mark (PIN: 0104)
- St. Matthew (PIN: 0105)
- St. Phillip (PIN: 0106)

**Grade 11 (Senior High):**
- **STEM:**
  - St. Gregory (PIN: 0111)
  - St. Ignatius (PIN: 0112)
  - St. Pedro Calungsod (PIN: 0113)
- **HUMSS:**
  - St. James (PIN: 0114)
  - St. Timothy (PIN: 0115)
- **TVL:**
  - St. Hannibal (PIN: 0116)
- **ABM:**
  - St. Pio (PIN: 0117)

**Grade 12 (Senior High):**
- **STEM:**
  - St. Margaret (PIN: 0121)
  - St. Martha (PIN: 0122)
  - St. Rita of Casia (PIN: 0123)
- **HUMSS:**
  - St. Philomena (PIN: 0124)
  - St. Teresa de Avila (PIN: 0125)
- **TVL:**
  - St. Agatha (PIN: 0126)
- **ABM:**
  - St. Gertrude (PIN: 0127)

### Strands (Senior High Only)
- STEM: Science Technology Engineering and Mathematics
- HUMSS: Humanities and Social Sciences
- TVL: Technical-Vocational-Livelihood
- ABM: Accountancy and Business Management

---

## 🎨 Design System

### Color Palette
```
Primary: #374426 (Dark Green)
Secondary: #47622a (Forest Green)
Accent: #799851 (Sage Green)
Light: #9fb878 (Light Green)
Cream: #dfddd1 (Cream)
Sage: #90997f (Sage)
Olive: #afb59d (Olive)
Pale: #d4d0b9 (Pale Green)
Muted: #9ea99c (Muted Green)
Forest: #102f15 (Deep Forest)
```

### Typography
- **Headings:** Montserrat (Bold, Semibold)
- **Body Text:** Poppins (Regular, Medium)
- **Special Text:** Garet Book

### Icons
- **Library:** Ionicons v7.1.0
- **Style:** Outline style
- **Usage:** Navigation, actions, status indicators

### UI Components
- **Buttons:** Rounded corners (rounded-lg, rounded-xl)
- **Cards:** White background, shadow-lg, rounded-2xl
- **Inputs:** Rounded-xl, border, focus ring
- **Modals:** Centered, backdrop blur, rounded-2xl
- **Tables:** Striped rows, hover effects

### Layout
- **Sidebar:** 256px width, fixed, primary color
- **Main Content:** Flex-1, cream background
- **Header:** White, shadow-md
- **Content Area:** Padding 24px

---

## 🗄️ Database Schema

### Collections

#### 1. users
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  role: String (enum: ['student', 'teacher', 'sao']),
  profilePicture: String,
  createdAt: Date
}
```

#### 2. students
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  lrn: String (unique, required),
  fullName: String (required),
  gradeLevel: String (required),
  section: String (required),
  sectionPin: String (required),
  strand: String,
  gender: String (enum: ['Male', 'Female']),
  position: String,
  parentGuardian: {
    fullName: String,
    email: String,
    contactNumber: String,
    relationship: String,
    homeAddress: String,
    parentalConsent: Boolean
  },
  createdAt: Date
}
```

#### 3. teachers
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  fullName: String (required),
  advisorySection: String,
  office: String (required),
  subjectsHandled: [{
    subjectName: String,
    section: String,
    background: String
  }],
  createdAt: Date
}
```

#### 4. attendances
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Student),
  date: Date (required),
  subject: String (required),
  section: String (required),
  status: String (enum: ['Present', 'Absent', 'Late', 'Excused']),
  lateMinutes: Number,
  excuseReason: String,
  documentationImage: String,
  submittedBy: ObjectId (ref: Student),
  createdAt: Date
}
```

#### 5. appointments
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (ref: Student),
  type: String (enum: ['Violation', 'Attendance Matter']),
  reason: String (required),
  date: Date (required),
  time: String (required),
  status: String (enum: ['Pending', 'Cancelled', 'Rescheduled', 'Done']),
  createdBy: ObjectId (ref: Teacher),
  createdAt: Date
}
```

#### 6. attendancesheets
```javascript
{
  _id: ObjectId,
  date: Date (required),
  section: String (required),
  subject: String (required),
  submittedBy: ObjectId (ref: Student),
  records: [{
    studentId: ObjectId (ref: Student),
    status: String,
    lateMinutes: Number,
    excuseReason: String
  }],
  isSubmitted: Boolean,
  submittedAt: Date,
  createdAt: Date
}
```

---

## 🔌 Complete API Reference

### Authentication Endpoints

#### POST /api/auth/register/student
Register a new student account.

**Request Body:**
```json
{
  "email": "student@email.com",
  "password": "password123",
  "lrn": "2024120001",
  "fullName": "Dela Cruz, Juan Pablo",
  "gradeLevel": "Grade 12",
  "section": "St. Margaret",
  "gender": "Male",
  "parentFullName": "Dela Cruz, Maria",
  "parentEmail": "parent@email.com",
  "parentContactNumber": "09123456789",
  "parentRelationship": "Mother",
  "parentHomeAddress": "123 Main St",
  "parentalConsent": true
}
```

**Response:**
```json
{
  "message": "Student registered successfully",
  "studentId": "507f1f77bcf86cd799439011"
}
```

#### POST /api/auth/register/teacher
Register a new teacher account.

**Request Body:**
```json
{
  "fullName": "Santos, Maria Clara",
  "email": "teacher@email.com",
  "password": "password123",
  "advisorySection": "Grade 12 - St. Margaret",
  "office": "Faculty"
}
```

**Response:**
```json
{
  "message": "Teacher registered successfully",
  "teacherId": "507f1f77bcf86cd799439012"
}
```

#### POST /api/auth/login
Login to the system.

**Request Body:**
```json
{
  "email": "user@email.com",
  "password": "password123",
  "rememberMe": true
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@email.com",
    "role": "student"
  }
}
```

### Student Endpoints

All student endpoints require authentication header:
```
Authorization: Bearer <token>
```

#### GET /api/student/profile
Get student profile information.

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": {
    "email": "student@email.com",
    "profilePicture": "url"
  },
  "lrn": "2024120001",
  "fullName": "Dela Cruz, Juan Pablo",
  "gradeLevel": "Grade 12",
  "section": "St. Margaret",
  "strand": "STEM",
  "gender": "Male",
  "position": "Board of Directors: Chairperson",
  "parentGuardian": { ... }
}
```

#### GET /api/student/attendance
Get all attendance records.

**Response:**
```json
[
  {
    "_id": "...",
    "date": "2024-03-12T00:00:00.000Z",
    "subject": "Mathematics",
    "status": "Present",
    "lateMinutes": 0
  }
]
```

#### GET /api/student/attendance/summary
Get attendance summary statistics.

**Response:**
```json
{
  "totalRecords": 150,
  "present": 140,
  "absent": 5,
  "late": 3,
  "excused": 2
}
```

#### GET /api/student/appointments
Get all appointments.

**Response:**
```json
[
  {
    "_id": "...",
    "type": "Violation",
    "reason": "Physical Assault",
    "date": "2024-03-15T00:00:00.000Z",
    "time": "10:00 AM",
    "status": "Pending"
  }
]
```

### Teacher Endpoints

#### GET /api/teacher/profile
Get teacher profile.

#### GET /api/teacher/masterlist
Get all students in advisory section.

#### POST /api/teacher/subjects
Add a new subject.

**Request Body:**
```json
{
  "subjectName": "Mathematics",
  "section": "Grade 12 - St. Margaret",
  "background": "image_url"
}
```

#### DELETE /api/teacher/subjects/:subjectId
Remove a subject.

#### PUT /api/teacher/assign-officer
Assign class officer position.

**Request Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439011",
  "position": "Board of Directors: Chairperson"
}
```

#### GET /api/teacher/subjects/:subjectName/students
Get all students enrolled in a subject.

#### GET /api/teacher/subjects/:subjectName/attendance
Get attendance records for a subject.

### SAO Endpoints

#### GET /api/sao/sections
Get all sections with students.

**Response:**
```json
{
  "Grade 12 - St. Margaret": [
    { student1 },
    { student2 }
  ],
  "Grade 11 - St. Gregory": [...]
}
```

#### POST /api/sao/appointments
Create appointment and send notifications.

**Request Body:**
```json
{
  "studentId": "507f1f77bcf86cd799439011",
  "type": "Violation",
  "reason": "Physical Assault",
  "date": "2024-03-15",
  "time": "10:00 AM"
}
```

**Response:**
```json
{
  "message": "Appointment created and notifications sent",
  "appointment": { ... }
}
```

#### GET /api/sao/appointments
Get all appointments.

#### PUT /api/sao/appointments/:id
Update appointment status.

**Request Body:**
```json
{
  "status": "Done"
}
```

#### GET /api/sao/students/:studentId/records
Get all records for a student.

**Response:**
```json
{
  "attendance": [...],
  "appointments": [...]
}
```

### Attendance Endpoints

#### POST /api/attendance/sheet/create
Create new attendance sheet (Supervisory Committee only).

**Request Body:**
```json
{
  "section": "Grade 12 - St. Margaret",
  "subject": "Mathematics",
  "date": "2024-03-12"
}
```

#### PUT /api/attendance/sheet/:sheetId
Update attendance sheet.

**Request Body:**
```json
{
  "records": [
    {
      "studentId": "...",
      "status": "Present",
      "lateMinutes": 0,
      "excuseReason": ""
    }
  ]
}
```

#### POST /api/attendance/sheet/:sheetId/submit
Submit attendance sheet (cannot be edited after).

#### GET /api/attendance/sheets
Get all attendance sheets for section.

#### GET /api/attendance/sheets/date/:date
Get attendance sheets for specific date.

### Appointment Endpoints

#### PUT /api/appointment/:id/reschedule
Request to reschedule appointment.

**Request Body:**
```json
{
  "date": "2024-03-20",
  "time": "2:00 PM"
}
```

#### PUT /api/appointment/:id/cancel
Cancel appointment.

---

## 🔐 Security Features

### Authentication
- JWT (JSON Web Tokens)
- Token expiration: 1 day (30 days with "Remember Me")
- Secure password hashing with bcryptjs
- Role-based access control

### Password Security
- Minimum length requirements
- Hashed before storage
- Never stored in plain text
- Salt rounds: 10

### API Security
- Authentication middleware on protected routes
- Role verification
- Input validation
- SQL injection prevention (MongoDB)
- XSS protection

### Data Privacy
- Parent/guardian data encrypted
- Email addresses validated
- Contact numbers validated
- GDPR-compliant data handling

---

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Optimizations
- Collapsible sidebar
- Touch-friendly buttons
- Responsive tables
- Mobile-first approach

---

## 🧪 Testing Guide

### Manual Testing Checklist

**Registration:**
- [ ] Student registration (all 4 steps)
- [ ] Teacher registration
- [ ] SAO registration
- [ ] Duplicate email prevention
- [ ] Duplicate LRN prevention
- [ ] Form validation

**Login:**
- [ ] Correct credentials
- [ ] Wrong credentials
- [ ] Remember me functionality
- [ ] Role-based redirect

**Student Features:**
- [ ] View profile
- [ ] View attendance summary
- [ ] View classes
- [ ] View appointments
- [ ] Supervisory Committee attendance sheet

**Teacher Features:**
- [ ] View masterlist
- [ ] Add subject
- [ ] Remove subject
- [ ] Assign officer
- [ ] View subject attendance

**SAO Features:**
- [ ] View all sections
- [ ] Create appointment
- [ ] Email notifications sent
- [ ] Update appointment status
- [ ] View student records

**Email System:**
- [ ] Student violation email
- [ ] Student attendance email
- [ ] Parent violation email
- [ ] Parent attendance email
- [ ] Adviser violation email
- [ ] Adviser attendance email

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All features tested
- [ ] No console errors
- [ ] Database migrations complete
- [ ] Environment variables set
- [ ] Gmail app password configured
- [ ] JWT secret changed
- [ ] .gitignore configured
- [ ] README updated

### Production Setup
- [ ] MongoDB Atlas configured
- [ ] Environment variables on hosting
- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Error logging setup
- [ ] Backup strategy in place

### Post-Deployment
- [ ] Test all features in production
- [ ] Monitor error logs
- [ ] Check email delivery
- [ ] Verify database connections
- [ ] Test from different devices
- [ ] Performance optimization

---

## 📞 Support & Maintenance

### Contact Information
- **Email:** sao.digital.records@gmail.com
- **Phone:** 09*********

### Maintenance Schedule
- Daily: Monitor error logs
- Weekly: Database backup
- Monthly: Security updates
- Quarterly: Feature updates

### Backup Strategy
- Daily automated backups
- Weekly manual verification
- Monthly archive to external storage
- Disaster recovery plan

---

## 📄 License & Copyright

**Copyright © 2024 Cordova Catholic School Multipurpose Cooperative**

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

## 🙏 Acknowledgments

### Development Team
- System Analyst
- Backend Developer
- Frontend Developer
- Database Administrator
- UI/UX Designer

### School Administration
- Principal
- SAO Coordinator
- IT Department
- Faculty Members

### Special Thanks
- All teachers and staff
- Students and parents
- Beta testers
- Technical advisors

---

**Document Version:** 1.0
**Last Updated:** March 12, 2026
**Status:** Production Ready

---

**End of Documentation**
