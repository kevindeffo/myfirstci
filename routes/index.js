const express = require('express');
const router = express.Router();

// Import routes files
const authRoutes = require('./auth');

// Use routes
router.use('/auth', authRoutes);

// Import specific forgot-password route
const { forgotPasswordRoute } = require('./auth');

// Integrate forgot-password route
router.use('/auth/forgot-password', forgotPasswordRoute);

module.exports = router;