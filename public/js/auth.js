// ============================================
// AUTH.JS - Authentication logic for login
// ============================================

const API_URL = 'http://localhost:5000/api';

// Modal controls
document.getElementById('loginBtn').addEventListener('click', () => {
    document.getElementById('loginModal').classList.remove('hidden');
});

document.getElementById('closeLoginModal').addEventListener('click', () => {
    document.getElementById('loginModal').classList.add('hidden');
});

document.getElementById('showRegisterBtn').addEventListener('click', () => {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('registerModal').classList.remove('hidden');
});

document.getElementById('closeRegisterModal').addEventListener('click', () => {
    document.getElementById('registerModal').classList.add('hidden');
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, rememberMe })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.user.role);
            
            // Redirect based on role
            if (data.user.role === 'student') {
                window.location.href = 'student-dashboard.html';
            } else if (data.user.role === 'teacher') {
                window.location.href = 'teacher-dashboard.html';
            } else if (data.user.role === 'sao') {
                window.location.href = 'sao-dashboard.html';
            }
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
    }
});

// Check if user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    
    if (token && role) {
        if (role === 'student') {
            window.location.href = 'student-dashboard.html';
        } else if (role === 'teacher') {
            window.location.href = 'teacher-dashboard.html';
        } else if (role === 'sao') {
            window.location.href = 'sao-dashboard.html';
        }
    }
});
