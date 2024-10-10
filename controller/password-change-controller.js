const User = require('../model/user');

async function changePassword(req, res) {
  const { userId, oldPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.changePassword(oldPassword, newPassword);
    res.status(200).json({ message: 'Password successfully changed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { changePassword };