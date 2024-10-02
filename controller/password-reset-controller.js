const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../model/user');

async function sendPasswordResetEmail(req, res) {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
      }
    });

    // Email options
    const mailOptions = {
      to: user.email,
      from: 'password-reset@yourdomain.com',
      subject: 'Password Reset Request',
      text: `You are receiving this email because you have requested the reset of your password.
Please click on the following link, or paste this into your browser to complete the process:
http://${req.headers.host}/reset/${token}
If you did not request this, please ignore this email and your password will remain unchanged.`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { sendPasswordResetEmail };