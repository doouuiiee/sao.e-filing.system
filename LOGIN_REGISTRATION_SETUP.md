# Login and Registration System Setup

## Completed Files

### 1. Login Page
- **File**: `public/login.html`
- **Features**:
  - Email/password login form
  - Social login buttons (Google, Facebook, GitHub, LinkedIn)
  - Remember me checkbox
  - Forgot password link
  - Link to registration page
  - Error message display
  - Responsive design with school color palette

### 2. Login JavaScript
- **File**: `public/js/login.js`
- **Features**:
  - Firebase authentication integration
  - Email/password sign-in
  - Social provider authentication (Google, Facebook, GitHub, LinkedIn)
  - Session persistence (remember me)
  - Role-based dashboard redirection
  - Error handling with user-friendly messages
  - Auto-redirect if already logged in

### 3. Registration Selection Page
- **File**: `public/register-select.html`
- **Features**:
  - Choose between Student or Teacher/Staff registration
  - Clean card-based UI
  - Links to specific registration forms
  - Back to home button

### 4. Student Registration JavaScript
- **File**: `public/js/register-student.js`
- **Features**:
  - Firebase user creation
  - Auto-fill default passwords based on section
  - Complete section data for all grades (7-12)
  - Backend API integration
  - Form validation
  - Error handling

### 5. Teacher Registration JavaScript
- **File**: `public/js/register-teacher.js`
- **Features**:
  - Firebase user creation
  - Password confirmation validation
  - Backend API integration
  - Admin approval workflow
  - Error handling

## Existing Files (Provided by User)

### Student Registration HTML
- **File**: `public/register-student.html` (your version)
- **Features**:
  - Multi-step registration form (4 steps)
  - Student information (LRN, name, email, grade, section, strand)
  - Parent/guardian information
  - Review step before submission
  - Progress bar
  - Dynamic section loading based on grade/strand
  - Default password auto-fill

### Teacher Registration HTML
- **File**: `public/register-teacher.html` (your version)
- **Features**:
  - Teacher/staff registration form
  - Employee ID, contact info
  - Office/department selection
  - Advisory section (optional)
  - Password confirmation
  - Terms and conditions checkbox

### Generic Registration HTML
- **File**: `public/register.html` (your version)
- **Features**:
  - Role selector (student/teacher toggle)
  - Combined form with conditional fields
  - Can be used as alternative to separate forms

## Integration Steps Needed

### 1. Add Firebase Script to register-student.html
Add before the closing `</body>` tag in your `register-student.html`:

```html
<script type="module" src="js/register-student.js"></script>
```

Replace the existing inline script with this single line.

### 2. Add Firebase Script to register-teacher.html
Add before the closing `</body>` tag in your `register-teacher.html`:

```html
<script type="module" src="js/register-teacher.js"></script>
```

Replace the existing inline script with this single line.

### 3. Update Firebase Configuration
In all three JavaScript files, replace the placeholder Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
    messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};
```

### 4. Backend API Endpoints Needed

The frontend expects these endpoints:

#### Authentication Verification
```
POST /api/auth/verify
Headers: Authorization: Bearer <idToken>
Response: { user: { role: 'student' | 'teacher' | 'sao' } }
```

#### Student Registration
```
POST /api/auth/register/student
Headers: Authorization: Bearer <idToken>
Body: {
  lrn, fullName, email, gradeLevel, strand, section, gender,
  parentGuardian: { name, email, contactNumber, relationship, address }
}
```

#### Teacher Registration
```
POST /api/auth/register/teacher
Headers: Authorization: Bearer <idToken>
Body: {
  fullName, email, employeeId, contactNumber, office, advisorySection
}
```

## Navigation Flow

```
index.html
  ├─> login.html (Email/Password or Social Login)
  │     ├─> student-dashboard.html (if role = student)
  │     ├─> teacher-dashboard.html (if role = teacher or staff)
  │     └─> sao-dashboard.html (if role = sao)
  │
  └─> register-select.html (Choose Role)
        ├─> register-student.html (Student Registration)
        │     └─> student-dashboard.html (After successful registration)
        │
        └─> register-teacher.html (Teacher Registration)
              └─> teacher-dashboard.html (After successful registration)
```

## Dashboard Redirection Logic

After successful login or registration, users are automatically redirected to their role-specific dashboard:

- **Students** → `student-dashboard.html`
- **Teachers/Staff** → `teacher-dashboard.html`
- **SAO Coordinators** → `sao-dashboard.html`

The system stores the user's role and auth token in localStorage for session management.

## Default Passwords by Section

All default passwords are automatically filled when students select their section:

- **Grade 7**: ANTH0701, ELIZ0702, FRAN0703, JOSE0704, MICH0705, ROQU0706, THOM0707
- **Grade 8**: ANDR0801, JUDE0802, LORE0803, MART0804, PAUL0805, PETE0806
- **Grade 9**: AGNE0901, ANNE0902, BERN0903, BRID0904, MONI0905, THER0906
- **Grade 10**: BENE1001, JOHN1002, LUKE1003, MARK1004, MATT1005, PHIL1006
- **Grade 11**: GREG1101, IGNA1102, PEDR1103, JAME1104, TIMO1105, HANN1106, PIO1107
- **Grade 12**: MARG1201, MART1202, RITA1203, PHIL1204, TERE1205, AGAT1206, GERT1207

Students can edit these passwords for privacy.

## Next Steps

1. Update `register-student.html` and `register-teacher.html` to use the Firebase JavaScript modules
2. Configure Firebase project and update config in all JS files
3. Implement backend API endpoints for registration and verification
4. Test the complete flow from registration to login to dashboard
5. Set up Firebase Authentication providers (Google, Facebook, GitHub, LinkedIn) if using social login

## Files Summary

**Created/Updated:**
- ✅ public/login.html
- ✅ public/js/login.js
- ✅ public/register-select.html
- ✅ public/js/register-student.js
- ✅ public/js/register-teacher.js
- ✅ public/index.html (updated navigation links)

**Provided by User (Ready to Use):**
- ✅ public/register-student.html
- ✅ public/register-teacher.html
- ✅ public/register.html
- ✅ public/css/main.css
- ✅ utils/sectionData.js
