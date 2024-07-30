const users = [
    { email: 'test@example.com', password: 'password123' }
    // Dummy data, replace with actual user lookup logic
];

const validateUser = (email, password) => {
    const user = users.find(user => user.email === email && user.password === password);
    return user !== undefined;
};

module.exports = { validateUser };