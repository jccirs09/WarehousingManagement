// JavaScript for Login Page

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // In a real application, you would add authentication logic here.
            // For this mock, we will just redirect to the admin page.
            window.location.href = 'admin.html';
        });
    }
});
