const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to change password
UserSchema.methods.changePassword = async function(oldPassword, newPassword) {
  const isMatch = await bcrypt.compare(oldPassword, this.password);
  if (!isMatch) {
    throw new Error('Old password is incorrect');
  }
  this.password = await bcrypt.hash(newPassword, 10);
  await this.save();
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);