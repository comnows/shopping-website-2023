const hamburgerButton = document.querySelector('.js-hamburger-button');
const navbar = document.querySelector('.js-navbar');
const navbarCloseButton = navbar.querySelector('.js-navbar-close-button');
const scrimElement = document.querySelector('.js-scrim');

hamburgerButton.addEventListener('click', () => {
    navbar.classList.add('navbar-show');
    scrimElement.classList.add('scrim-open');
});

navbarCloseButton.addEventListener('click', () => {
    navbar.classList.remove('navbar-show');
    scrimElement.classList.remove('scrim-open');
});