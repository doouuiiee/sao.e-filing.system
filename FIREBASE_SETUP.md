# 🔥 Firebase Setup Guide
## SAO E-Record Filing System

This guide will help you set up Firebase Authentication for the system.

---

## 📋 What is Firebase?

Firebase is Google's platform that provides:
- **Authentication**: Secure user login with email/password, Google, Facebook, etc.
- **Real-time Database**: Store and sync data in real-time
- **Cloud Storage**: Store files like excuse slips and documents
- **Hosting**: Deploy your website

For this system, we use:
- **Firebase Authentication** for user logins
- **MongoDB** for storing violations, records, and data
- **Node.js** for backend logic

---

## 🚀 Step 1: Create Firebase Project

1. Go to: https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name: "SAO E-Record System"
4. Disable Google Analytics (optional)
5. Click "Create project"

---

## 🔐 Step 2: Enable Authentication

1. In Firebase Console, click "Authentication" in left sidebar
2. Click "Get started"
3. Click "Sign-in method" tab
4. Enable "Email/Password"
5. Click "Save"

Optional: Enable Google Sign-In
1. Click "Google" provider
2. Toggle "Enable"
3. Enter support email
4. Click "Save"

---

## 🌐 Step 3: Register Web App

1. In Firebase Console, click the gear icon ⚙️ → "Project settings"
2. Scroll down to "Your apps"
3. Click the web icon `</>`
4. Enter app nickname: "SAO Web App"
5. Check "Also set up Firebase Hosting"
6. Click "Register app"
7. Copy the Firebase configuration object

---

## 📝 Step 4: Add Firebase Config to Frontend

Create `public/js/firebase-config.js`:

```javascript
// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
```

---

## 🔑 Step 5: Download Service Account Key

For backend (Node.js) to verify tokens:

1. In Firebase Console, click gear icon ⚙️ → "Project settings"
2. Click "Service accounts" tab
3. Click "Generate new private key"
4. Click "Generate key"
5. Save the JSON file as `config/serviceAccountKey.json`

**IMPORTANT:** Never commit this file to Git!

---

## 📦 Step 6: Install Firebase SDK

### Frontend (Already in HTML)
Add to your HTML files:
```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js"></script>
```

### Backend (Node.js)
Already added to package.json:
```bash
npm install firebase-admin
```

---

## 🔧 Step 7: Update .env File

Add to your `.env` file:
```env
# Existing variables...
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="your-private-key"
```

---

## 💻 Step 8: Update Authentication Flow

### Registration Flow:
1. User fills registration form
2. Create Firebase user: `firebase.auth().createUserWithEmailAndPassword(email, password)`
3. Get Firebase UID
4. Create MongoDB user with Firebase UID
5. Redirect to dashboard

### Login Flow:
1. User enters email/password
2. Sign in with Firebase: `firebase.auth().signInWithEmailAndPassword(email, password)`
3. Get Firebase ID token: `user.getIdToken()`
4. Send token to backend
5. Backend verifies token with Firebase Admin SDK
6. Return user data from MongoDB

---

## 🎯 Implementation Example

### Frontend Login (public/js/auth.js):
```javascript
// Login with Firebase
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        // Sign in with Firebase
        const userCredential = await firebase.auth()
            .signInWithEmailAndPassword(email, password);
        
        // Get ID token
        const idToken = await userCredential.user.getIdToken();
        
        // Send to backend
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('firebaseToken', idToken);
            localStorage.setItem('userRole', data.user.role);
            
            // Redirect based on role
            if (data.user.role === 'student') {
                window.location.href = 'student-dashboard.html';
            }
        }
    } catch (error) {
        alert(error.message);
    }
});
```

### Backend Verification (routes/auth.js):
```javascript
const { auth } = require('../config/firebase');

router.post('/login', async (req, res) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        // Verify Firebase token
        const decodedToken = await auth.verifyIdToken(token);
        const email = decodedToken.email;
        
        // Find user in MongoDB
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
```

---

## 🔒 Security Rules

### Firebase Authentication:
- Email verification (optional)
- Password requirements: minimum 6 characters
- Account lockout after failed attempts

### Backend:
- Verify Firebase tokens on every request
- Check user role from MongoDB
- Validate all inputs

---

## 📊 Firebase vs MongoDB

| Feature | Firebase | MongoDB |
|---------|----------|---------|
| Authentication | ✅ Used | ❌ Not used |
| User Login | ✅ Firebase Auth | ❌ |
| Violations | ❌ | ✅ Stored here |
| Attendance | ❌ | ✅ Stored here |
| Appointments | ❌ | ✅ Stored here |
| Student Records | ❌ | ✅ Stored here |
| File Storage | ✅ Can use | ❌ |

---

## 🧪 Testing Firebase

### Test Registration:
```javascript
firebase.auth().createUserWithEmailAndPassword('test@student.com', 'password123')
    .then((userCredential) => {
        console.log('User created:', userCredential.user.uid);
    })
    .catch((error) => {
        console.error('Error:', error.message);
    });
```

### Test Login:
```javascript
firebase.auth().signInWithEmailAndPassword('test@student.com', 'password123')
    .then((userCredential) => {
        console.log('Logged in:', userCredential.user.email);
        return userCredential.user.getIdToken();
    })
    .then((token) => {
        console.log('Token:', token);
    });
```

---

## 🐛 Common Issues

### Issue: "Firebase not defined"
**Solution:** Make sure Firebase scripts are loaded before your code:
```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js"></script>
<script src="js/firebase-config.js"></script>
<script src="js/auth.js"></script>
```

### Issue: "Service account key not found"
**Solution:** 
1. Download service account key from Firebase Console
2. Save as `config/serviceAccountKey.json`
3. Add to `.gitignore`

### Issue: "Token verification failed"
**Solution:**
- Check if service account key is correct
- Verify token is being sent in Authorization header
- Check if token is expired (tokens expire after 1 hour)

---

## 📱 Optional: Enable Google Sign-In

1. Enable Google provider in Firebase Console
2. Add to HTML:
```html
<button id="googleSignIn">Sign in with Google</button>
```

3. Add to JavaScript:
```javascript
document.getElementById('googleSignIn').addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        const idToken = await result.user.getIdToken();
        // Send to backend...
    } catch (error) {
        console.error(error);
    }
});
```

---

## 💾 File Storage with Firebase

For storing excuse slips and documents:

1. Enable Cloud Storage in Firebase Console
2. Set up storage rules
3. Upload files:
```javascript
const storage = firebase.storage();
const storageRef = storage.ref();
const fileRef = storageRef.child('excuse-slips/' + fileName);

fileRef.put(file).then((snapshot) => {
    snapshot.ref.getDownloadURL().then((url) => {
        console.log('File URL:', url);
        // Save URL to MongoDB
    });
});
```

---

## 📞 Support

If you need help with Firebase setup:
- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com/
- Email: sao.digital.records@gmail.com

---

## ✅ Setup Checklist

- [ ] Created Firebase project
- [ ] Enabled Email/Password authentication
- [ ] Registered web app
- [ ] Copied Firebase config
- [ ] Downloaded service account key
- [ ] Added config to frontend
- [ ] Installed firebase-admin
- [ ] Updated .env file
- [ ] Tested registration
- [ ] Tested login
- [ ] Verified token on backend

---

**You're ready to use Firebase Authentication! 🎉**
