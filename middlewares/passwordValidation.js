function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumeric = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumeric &&
    hasSpecialChar
  );
}

function passwordValidationMiddleware(req, res, next) {
  const { password } = req.body;
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password does not meet security requirements' });
  }
  next();
}

module.exports = passwordValidationMiddleware;