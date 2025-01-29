const express = require('express');
const router = express.Router();
const { login } = require('../controller/auth-controller');
const { signup } = require('../controller/user-controller');

// POST /auth/login
router.post('/login', login);

// POST /auth/signup
router.post('/signup', signup);

module.exports = router;