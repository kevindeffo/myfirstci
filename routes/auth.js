const express = require('express');
const router = express.Router();
const { login, forgotPassword } = require('../controller/auth-controller');

// POST /auth/login
router.post('/login', login);

// POST /auth/forgot-password
router.post('/forgot-password', forgotPassword);

module.exports = router;