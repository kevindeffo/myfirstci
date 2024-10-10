const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../services/email');

async function login(req, res) {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' }); // Replace 'secret' with a real secret in production
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function requestPasswordReset(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ userId: user._id }, 'resetSecret', { expiresIn: '1h' });
    const resetLink = `http://example.com/reset-password?token=${resetToken}`;

    await sendEmail(user.email, 'Password Reset Request', `Click this link to reset your password: ${resetLink}`);

    res.json({ message: 'Password reset link sent to your email address' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { login, requestPasswordReset };