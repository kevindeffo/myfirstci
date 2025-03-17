const express = require('express');
const router = express.Router();
const { login, signup } = require('../controller/auth-controller');

// POST /auth/login
router.post('/login', login);

// POST /auth/signup
router.post('/signup', signup);

module.exports = router;