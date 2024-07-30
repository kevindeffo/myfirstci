const express = require('express');
const bodyParser = require('body-parser');
const { login } = require('./controller/login-controller');

const app = express();
app.use(bodyParser.json());

app.post('/login', login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});