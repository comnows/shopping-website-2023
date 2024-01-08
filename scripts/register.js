const loginRegisterWrapper = document.querySelector('.login-register-wrapper');
const loginRegister = document.querySelector('.login-register');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const loginCloseButton = document.querySelector('.js-login-close-button');

registerLink.addEventListener('click', () => {
    loginRegisterWrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    loginRegisterWrapper.classList.remove('active');
});

loginCloseButton.addEventListener('click', () => {
    loginRegisterWrapper.classList.remove('active-popup');
    loginRegister.classList.remove('active-popup');
})