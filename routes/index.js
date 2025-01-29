const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./auth');

// Use routes
router.use('/auth', authRoutes);

// New signup route
router.post('/auth/signup', (req, res) => {
    // Handle signup logic here
    res.send('Signup route');
});

module.exports = router;