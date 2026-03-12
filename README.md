# SAO E-Record Filing System

A comprehensive digital platform for managing student records, tracking attendance, and handling disciplinary actions at Cordova Catholic School Multipurpose Cooperative.

## 🎯 Features

### Authentication & Security
- Firebase Authentication (Email/Password + Social Login)
- Role-based access control (Student, Teacher, SAO)
- Password reset functionality
- Secure JWT token management

### Student Management
- Student registration with 4-step process
- LRN-based identification
- Grade and section management
- Parent/Guardian information tracking
- Auto-fill default passwords by section

### Attendance Tracking
- Daily attendance recording
- Late and absent tracking
- Automatic parent notifications (3x late, 5x absent, 3x absent, 5x late)
- Attendance history and reports

### Violation Management
- 9 violation categories
- Appointment scheduling
- Evidence documentation
- Email notifications to parents
- Violation history tracking

### Dashboards
- Student Dashboard - View records and appointments
- Teacher Dashboard - Manage class attendance and violations
- SAO Dashboard - Oversee all student records and appointments

### Additional Features
- Real-time notifications
- Search functionality
- Document upload system
- Email service integration
- Responsive design for mobile devices

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** Firebase Authentication
- **Email:** Nodemailer with Gmail
- **Styling:** Custom CSS with Tailwind-inspired utilities

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Firebase project
- Gmail account (for email service)


## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/sao-erecord-system.git
cd sao-erecord-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
FRONTEND_URL=http://localhost:5000
```

### 4. Configure Firebase
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password)
3. Update Firebase config in:
   - `public/js/login.js`
   - `public/js/register-student.js`
   - `public/js/register-teacher.js`
   - `public/js/forgot-password.js`

### 5. Download Firebase Service Account Key
1. Go to Firebase Console → Project Settings → Service Accounts
2. Generate new private key
3. Save as `config/serviceAccountKey.json`

### 6. Seed the database (optional)
```bash
npm run seed:students
npm run seed:attendance
# Or seed both at once
npm run seed:all
```

### 7. Start the server
```bash
npm start
```

Visit `http://localhost:5000` in your browser.

## 📁 Project Structure

```
sao-erecord-system/
├── config/
│   └── firebase.js
├── middleware/
│   ├── auth.js
│   └── firebaseAuth.js
├── models/
│   ├── Student.js
│   ├── Teacher.js
│   ├── User.js
│   ├── Attendance.js
│   ├── Appointment.js
│   └── AttendanceSheet.js
├── public/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   ├── login.js
│   │   ├── register-student.js
│   │   ├── register-teacher.js
│   │   ├── forgot-password.js
│   │   ├── search.js
│   │   └── notifications.js
│   ├── index.html
│   ├── login.html
│   ├── register-select.html
│   ├── register-student.html
│   ├── register-teacher.html
│   ├── forgot-password.html
│   ├── student-dashboard.html
│   ├── teacher-dashboard.html
│   └── sao-dashboard.html
├── routes/
│   ├── auth.js
│   ├── student.js
│   ├── teacher.js
│   ├── sao.js
│   ├── attendance.js
│   └── appointment.js
├── utils/
│   ├── constants.js
│   ├── emailService.js
│   ├── sectionData.js
│   ├── seedStudents.js
│   └── seedAttendance.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```


## 🎨 Default Passwords by Section

Students can use these default passwords during registration (editable for privacy):

**Grade 7:** ANTH0701, ELIZ0702, FRAN0703, JOSE0704, MICH0705, ROQU0706, THOM0707  
**Grade 8:** ANDR0801, JUDE0802, LORE0803, MART0804, PAUL0805, PETE0806  
**Grade 9:** AGNE0901, ANNE0902, BERN0903, BRID0904, MONI0905, THER0906  
**Grade 10:** BENE1001, JOHN1002, LUKE1003, MARK1004, MATT1005, PHIL1006  
**Grade 11:** GREG1101, IGNA1102, PEDR1103, JAME1104, TIMO1105, HANN1106, PIO1107  
**Grade 12:** MARG1201, MART1202, RITA1203, PHIL1204, TERE1205, AGAT1206, GERT1207

## 📚 Documentation

- [Complete Documentation](COMPLETE_DOCUMENTATION.md)
- [Setup Guide](SETUP_GUIDE.md)
- [Firebase Setup](FIREBASE_SETUP.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Authentication Guide](AUTHENTICATION_COMPLETE.md)
- [New Features](NEW_FEATURES_IMPLEMENTED.md)

## 🔐 Security

- All sensitive data is stored in `.env` file (not committed to Git)
- Firebase handles authentication securely
- JWT tokens for API authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS configuration
- Rate limiting on API endpoints

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions for:
- GitHub
- Render
- Heroku
- Other platforms

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- Your Name - Initial work

## 🙏 Acknowledgments

- Cordova Catholic School Multipurpose Cooperative
- Firebase for authentication services
- MongoDB Atlas for database hosting
- All contributors and testers

## 📞 Support

For support, email sao.digital.records@gmail.com or create an issue in this repository.

---

Made with ❤️ for Cordova Catholic School
