// Firebase configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

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
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// Show success message
function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 10000);
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Handle form submission
forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        // Send password reset email
        await sendPasswordResetEmail(auth, email);
        
        showSuccess('Password reset email sent! Please check your inbox and follow the instructions to reset your password.');
        
        // Clear form
        emailInput.value = '';
        
        // Re-enable button after delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Reset Link <ion-icon name="send-outline" style="font-size: 20px;"></ion-icon>';
        }, 3000);

    } catch (error) {
        console.error('Password reset error:', error);
        
        let errorMsg = 'Failed to send reset email. Please try again.';
        
        if (error.code === 'auth/user-not-found') {
            errorMsg = 'No account found with this email address.';
        } else if (error.code === 'auth/invalid-email') {
            errorMsg = 'Invalid email address.';
        } else if (error.code === 'auth/too-many-requests') {
            errorMsg = 'Too many requests. Please try again later.';
        }

        showError(errorMsg);
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Reset Link <ion-icon name="send-outline" style="font-size: 20px;"></ion-icon>';
    }
});
