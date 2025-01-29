// Helper function to validate user input
function validateUserInput(userData) {
    const errors = [];
    if (!userData.username || typeof userData.username !== 'string') {
        errors.push('Invalid username');
    }
    if (!userData.password || userData.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    // Add more validation rules as needed
    return errors;
}

// Helper function to handle errors during registration
function handleRegistrationError(error) {
    console.error('Registration error:', error);
    return {
        success: false,
        message: 'Registration failed',
        error: error.message || 'An unknown error occurred'
    };
}

module.exports = {
    validateUserInput,
    handleRegistrationError
};