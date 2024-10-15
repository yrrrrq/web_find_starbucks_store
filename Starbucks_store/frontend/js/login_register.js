document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        console.log("正在发送登录请求", {username, password});

        const jsonbody = JSON.stringify({
            username: username,
            password: password
        });
        console.log("body:", jsonbody);

        fetch('http://127.0.0.1:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonbody
        })
        .then(response => response.text())
        .then(data => {
            console.log("等待登录响应...: ", data);
            alert(data);
        })
        .catch(error => console.error('Error:', error));
    });

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        console.log("正在发送注册请求", {username, password});

        const jsonbody = JSON.stringify({
            username: username,
            password: password
        });
        console.log("body:", jsonbody);

        fetch('http://127.0.0.1:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonbody
        })
        .then(response => response.text())
        .then(data => {
            console.log("等待注册响应...: ", data);
            alert(data);
        })
        .catch(error => console.error('Error:', error));
    });
});
