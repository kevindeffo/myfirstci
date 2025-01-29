const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const logger = require('./logger'); // Assume a logger module is available

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;

        // Validate email format
        if (!validateEmail(email)) {
            return res.status(400).send('Invalid email format');
        }

        // Simulate finding user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Generate a reset token with expiration
        const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Simulate saving the token to the user's record
        await saveResetTokenToUser(user, resetToken);

        // Send email with the reset token secure
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `You requested a password reset. Use this token to reset your password: ${resetToken}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send('Password reset email sent');
    } catch (error) {
        logger.error('Error in forgotPassword:', error);
        res.status(500).send('Internal server error');
    }
}

// Placeholder functions for user operations
async function findUserByEmail(email) {
    // Simulate database lookup
    return { email: email, id: 1 };
}

async function saveResetTokenToUser(user, token) {
    // Simulate saving the reset token to the user's record
    logger.info(`Saving reset token for user ${user.id}`);
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    forgotPassword
};