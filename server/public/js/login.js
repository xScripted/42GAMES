window.addEventListener('DOMContentLoaded', () => {
    const loginGoogle = document.getElementById('loginGoogle');
    const loginFacebook = document.getElementById('loginFacebook');

    loginGoogle.addEventListener('click', handleLoginGoogle);
    loginFacebook.addEventListener('click', handleLoginFacebook);
});

const handleLoginGoogle = event => {
    $.get('http://localhost:3000/login', data => {
        console.log(data);
    });
}

const handleLoginFacebook = event => {
    $.get('http://localhost:3000/login', data => {
        console.log(data);
    });
}