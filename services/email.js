const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Remplacez ceci par votre email
    pass: 'your-email-password' // Remplacez ceci par votre mot de passe email
  }
});

async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;