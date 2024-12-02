const { validateUser } = require('../auth/user-auth');

const login = (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const isValidUser = validateUser(email, password);

    if (isValidUser) {
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
};

module.exports = { login };