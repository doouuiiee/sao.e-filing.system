// Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBJRzX4adp_LFOARTc53UzX9OuOMHS0Tus",
    authDomain: "logininfo-c2e4a.firebaseapp.com",
    databaseURL: "https://logininfo-c2e4a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "logininfo-c2e4a",
    storageBucket: "logininfo-c2e4a.firebasestorage.app",
    messagingSenderId: "1044079063505",
    appId: "1:1044079063505:web:a331dd290feacfb2b5f0f0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle form submission
document.getElementById('teacherRegistrationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Check password match
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Get form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        employeeId: document.getElementById('employeeId').value,
        contactNumber: document.getElementById('contactNumber').value,
        office: document.getElementById('office').value,
        advisorySection: document.getElementById('advisorySection').value || null,
        password: password
    };

    try {
        // Create Firebase user
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Update profile with display name
        await updateProfile(user, {
            displayName: formData.fullName
        });

        // Get ID token
        const idToken = await user.getIdToken();

        // Send teacher data to backend
        const response = await fetch('/api/auth/register/teacher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to register teacher in database');
        }

        const result = await response.json();

        // Store auth info
        localStorage.setItem('authToken', idToken);
        localStorage.setItem('userRole', 'teacher');

        alert('Registration successful! Redirecting to your dashboard...');
        window.location.href = 'teacher-dashboard.html';

    } catch (error) {
        console.error('Registration error:', error);
        
        let errorMsg = 'Registration failed. Please try again.';
        
        if (error.code === 'auth/email-already-in-use') {
            errorMsg = 'This email is already registered.';
        } else if (error.code === 'auth/weak-password') {
            errorMsg = 'Password should be at least 6 characters.';
        } else if (error.code === 'auth/invalid-email') {
            errorMsg = 'Invalid email address.';
        }

        alert(errorMsg);
    }
});
