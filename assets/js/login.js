document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username && password) {
        // Add your login logic here
        console.log('Username:', username);
        console.log('Password:', password);
    } else {
        alert('Please enter both username and password');
    }
});