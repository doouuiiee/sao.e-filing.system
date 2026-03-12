// MongoDB + JWT Authentication (No Firebase)
// This version works with your existing backend

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
        sao: 'sao-dashboard.html',
        staff: 'teacher-dashboard.html'
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
        // Send login request to backend
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, rememberMe })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        const data = await response.json();

        // Store token and user info
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('authToken', data.token);
        storage.setItem('userRole', data.user.role);
        storage.setItem('userId', data.user.id);
        storage.setItem('userEmail', data.user.email);

        // Redirect to appropriate dashboard
        redirectToDashboard(data.user.role);

    } catch (error) {
        console.error('Login error:', error);
        showError(error.message || 'Login failed. Please check your credentials and try again.');
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Sign In <ion-icon name="arrow-forward-outline" style="font-size: 20px;"></ion-icon>';
    }
});

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const role = localStorage.getItem('userRole') || sessionStorage.getItem('userRole');
    
    if (token && role) {
        redirectToDashboard(role);
    }
});
