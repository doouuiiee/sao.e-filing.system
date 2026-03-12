// Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    GithubAuthProvider,
    OAuthProvider,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence
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

// DOM elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const rememberMeCheckbox = document.getElementById('rememberMe');
const submitBtn = document.getElementById('submitBtn');
const errorMessage = document.getElementById('errorMessage');
const googleBtn = document.getElementById('googleBtn');
const facebookBtn = document.getElementById('facebookBtn');
const githubBtn = document.getElementById('githubBtn');
const linkedinBtn = document.getElementById('linkedinBtn');

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Get user role from backend
async function getUserRole(idToken) {
    try {
        const response = await fetch('/api/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to verify user');
        }

        const data = await response.json();
        return data.user.role;
    } catch (error) {
        console.error('Error getting user role:', error);
        throw error;
    }
}

// Redirect based on role
function redirectToDashboard(role) {
    const dashboards = {
        student: 'student-dashboard.html',
        teacher: 'teacher-dashboard.html',
        sao: 'sao-dashboard.html',
        staff: 'teacher-dashboard.html' // Staff uses teacher dashboard
    };

    const dashboard = dashboards[role.toLowerCase()] || 'student-dashboard.html';
    window.location.href = dashboard;
}

// Email/Password login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const rememberMe = rememberMeCheckbox.checked;

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    try {
        // Set persistence based on remember me
        const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
        await setPersistence(auth, persistence);

        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Get ID token
        const idToken = await user.getIdToken();

        // Get user role from backend
        const role = await getUserRole(idToken);

        // Store token in localStorage
        localStorage.setItem('authToken', idToken);
        localStorage.setItem('userRole', role);

        // Redirect to appropriate dashboard
        redirectToDashboard(role);

    } catch (error) {
        console.error('Login error:', error);
        
        let errorMsg = 'Login failed. Please try again.';
        
        if (error.code === 'auth/user-not-found') {
            errorMsg = 'No account found with this email.';
        } else if (error.code === 'auth/wrong-password') {
            errorMsg = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/invalid-email') {
            errorMsg = 'Invalid email address.';
        } else if (error.code === 'auth/user-disabled') {
            errorMsg = 'This account has been disabled.';
        } else if (error.code === 'auth/too-many-requests') {
            errorMsg = 'Too many failed attempts. Please try again later.';
        }

        showError(errorMsg);
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Sign In <ion-icon name="arrow-forward-outline" style="font-size: 20px;"></ion-icon>';
    }
});

// Social login handler
async function handleSocialLogin(provider, providerName) {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Get ID token
        const idToken = await user.getIdToken();

        // Get user role from backend
        const role = await getUserRole(idToken);

        // Store token in localStorage
        localStorage.setItem('authToken', idToken);
        localStorage.setItem('userRole', role);

        // Redirect to appropriate dashboard
        redirectToDashboard(role);

    } catch (error) {
        console.error(`${providerName} login error:`, error);
        
        let errorMsg = `${providerName} login failed. Please try again.`;
        
        if (error.code === 'auth/popup-closed-by-user') {
            errorMsg = 'Login cancelled.';
        } else if (error.code === 'auth/account-exists-with-different-credential') {
            errorMsg = 'An account already exists with this email using a different sign-in method.';
        } else if (error.code === 'auth/popup-blocked') {
            errorMsg = 'Popup was blocked. Please allow popups for this site.';
        }

        showError(errorMsg);
    }
}

// Google login
googleBtn.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    handleSocialLogin(provider, 'Google');
});

// Facebook login
facebookBtn.addEventListener('click', () => {
    const provider = new FacebookAuthProvider();
    handleSocialLogin(provider, 'Facebook');
});

// GitHub login
githubBtn.addEventListener('click', () => {
    const provider = new GithubAuthProvider();
    handleSocialLogin(provider, 'GitHub');
});

// LinkedIn login (using Microsoft OAuth)
linkedinBtn.addEventListener('click', () => {
    const provider = new OAuthProvider('microsoft.com');
    handleSocialLogin(provider, 'LinkedIn');
});

// Check if user is already logged in
auth.onAuthStateChanged(async (user) => {
    if (user) {
        try {
            const idToken = await user.getIdToken();
            const role = await getUserRole(idToken);
            
            localStorage.setItem('authToken', idToken);
            localStorage.setItem('userRole', role);
            
            redirectToDashboard(role);
        } catch (error) {
            console.error('Error checking auth state:', error);
        }
    }
});
