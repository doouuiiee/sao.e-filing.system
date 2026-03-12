// MongoDB Password Reset (No Firebase)

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
        // Send password reset request to backend
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to send reset email');
        }

        showSuccess('Password reset email sent! Please check your inbox and follow the instructions.');

        
        // Clear form
        emailInput.value = '';
        
        // Re-enable button after delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Reset Link <ion-icon name="send-outline" style="font-size: 20px;"></ion-icon>';
        }, 3000);

    } catch (error) {
        console.error('Password reset error:', error);
        showError(error.message || 'Failed to send reset email. Please try again.');
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Reset Link <ion-icon name="send-outline" style="font-size: 20px;"></ion-icon>';
    }
});
