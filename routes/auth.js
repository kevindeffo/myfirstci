const express = require('express');
const router = express.Router();
const { login, requestPasswordReset } = require('../controller/auth-controller');

// POST /auth/login
router.post('/login', login);

// POST /auth/reset-password
router.post('/reset-password', requestPasswordReset);

module.exports = router;