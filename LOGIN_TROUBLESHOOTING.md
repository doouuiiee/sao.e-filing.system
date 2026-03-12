# Login Troubleshooting Guide

## 🔍 Problem Identified

Your login is failing because there's a **mismatch between frontend and backend authentication**:

### Current Setup:
- **Frontend (`login.js`)**: Uses Firebase Authentication
- **Backend (`routes/auth.js`)**: Uses traditional JWT + MongoDB authentication
- **Missing**: `/api/auth/verify` endpoint that frontend is calling

## ⚠️ The Issue

1. Frontend tries to login with Firebase
2. Firebase authentication succeeds
3. Frontend calls `/api/auth/verify` to get user role
4. **This endpoint doesn't exist** → Login fails

## 🔧 Solution Options

You have 3 options to fix this:

---

## Option 1: Use Firebase Only (Recommended) ✅

Keep Firebase for authentication, add the missing verify endpoint.

### Step 1: Add Verify Endpoint

Add this to `routes/auth.js`:

```javascript
// Verify Firebase Token and Get User Role
router.post('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify Firebase token
    const { auth } = require('../config/firebase');
    const decodedToken = await auth.verifyIdToken(idToken);
    const email = decodedToken.email;

    // Find user in MongoDB by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
        name: user.fullName || user.email
      }
    });
  } catch (error) {
    console.error('Verify error:', error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
});
```

### Step 2: Update Registration to Create Firebase Users

Your registration needs to:
1. Create user in Firebase
2. Store user data in MongoDB

---

## Option 2: Use MongoDB Only (Simpler)

Remove Firebase, use only MongoDB + JWT.

### Step 1: Replace `login.js`

```javascript
// DOM elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Redirect based on role
function redirectToDashboard(role) {
    const dashboards = {
        student: 'student-dashboard.html',
        teacher: 'teacher-dashboard.html',
        sao: 'sao-dashboard.html'
    };
    window.location.href = dashboards[role.toLowerCase()] || 'student-dashboard.html';
}

// Email/Password login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, rememberMe })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();

        // Store token and user info
        if (rememberMe) {
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userRole', data.user.role);
        } else {
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('userRole', data.user.role);
        }

        redirectToDashboard(data.user.role);

    } catch (error) {
        console.error('Login error:', error);
        showError(error.message || 'Login failed. Please check your credentials.');
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Sign In <ion-icon name="arrow-forward-outline" style="font-size: 20px;"></ion-icon>';
    }
});
```

---

## Option 3: Hybrid (Firebase + MongoDB)

Use Firebase for authentication, MongoDB for data storage.

This is what you originally intended. Requires:
1. Add `/api/auth/verify` endpoint (see Option 1)
2. Update registration to create Firebase users first
3. Store user data in MongoDB with Firebase UID

---

## 🎯 Quick Fix (Recommended)

**Use Option 2 (MongoDB Only)** - It's simpler and already mostly implemented.

### What to do:

1. **Replace `public/js/login.js`** with the MongoDB version (see Option 2 above)

2. **Test with existing users** or create a test user:
   ```bash
   # In MongoDB or through registration
   Email: test@example.com
   Password: test123
   ```

3. **Remove Firebase imports** from login.html if not using Firebase

---

## 🐛 Common Login Issues

### Issue 1: "No account found"
**Cause:** User doesn't exist in database
**Fix:** Register first or check MongoDB for user

### Issue 2: "Invalid credentials"
**Cause:** Wrong password
**Fix:** Check password or use forgot password

### Issue 3: "Failed to verify user"
**Cause:** `/api/auth/verify` endpoint missing
**Fix:** Add the endpoint (see Option 1)

### Issue 4: Firebase errors
**Cause:** Firebase not properly configured
**Fix:** Either configure Firebase properly or use MongoDB only

### Issue 5: CORS errors
**Cause:** Frontend and backend on different ports
**Fix:** Configure CORS in server.js

---

## 🔍 Debugging Steps

### 1. Check Browser Console
```
F12 → Console tab
Look for error messages
```

### 2. Check Network Tab
```
F12 → Network tab
Look for failed requests
Check response status codes
```

### 3. Check Server Logs
```
Look at terminal where server is running
Check for error messages
```

### 4. Test Backend Directly
```bash
# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

---

## ✅ Recommended Solution

**I recommend Option 2 (MongoDB Only)** because:
1. ✅ Your backend is already set up for it
2. ✅ Simpler to implement
3. ✅ No Firebase configuration needed
4. ✅ Works immediately

**If you want Firebase:**
- You need to add the `/api/auth/verify` endpoint
- Update registration to create Firebase users
- More complex but supports social login

---

## 🚀 Next Steps

1. Choose which option you want
2. I'll help you implement it
3. Test the login
4. Fix any remaining issues

Which option do you prefer?
- Option 1: Firebase + MongoDB (more features, more complex)
- Option 2: MongoDB Only (simpler, works now)
- Option 3: Hybrid (best of both, most complex)

Let me know and I'll help you implement it! 🎯
