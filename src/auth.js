window.onload = function () {
    var loginForm = document.querySelector('#login > button');
    loginForm.addEventListener('click', function (event) {
        event.preventDefault();
        var email = document.querySelector('#email').value;
        var password = document.querySelector('#password').value;
        localStorage.setItem('token', btoa(email + password));
    });
}