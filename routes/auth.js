const express = require('express');
const router = express.Router();
const { login } = require('../controller/auth-controller');
const { changePassword } = require('../controller/password-change-controller');

// POST /auth/login
router.post('/login', login);

// POST /auth/change-password
router.post('/change-password', changePassword);

module.exports = router;