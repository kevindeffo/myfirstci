const express = require('express');
const router = express.Router();
const { login } = require('../controller/auth-controller');
const { sendPasswordResetEmail } = require('../controller/password-reset-controller');

// POST /auth/login
router.post('/login', login);

// POST /auth/forgot-password
router.post('/forgot-password', sendPasswordResetEmail);

module.exports = router;