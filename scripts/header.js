import { calculateCartQuantity } from "../data/cart.js";

const hamburgerButton = document.querySelector('.js-hamburger-button');
const navbar = document.querySelector('.js-navbar');
const navbarCloseButton = navbar.querySelector('.js-navbar-close-button');
const scrimElement = document.querySelector('.js-scrim');

const userButton = document.querySelector('.js-user-button');
const loginRegisterWrapper = document.querySelector('.login-register-wrapper');
const loginRegister = document.querySelector('.login-register');

const genderLink = document.querySelectorAll('.js-gender-header-link');

hamburgerButton.addEventListener('click', () => {
    navbar.classList.add('navbar-show');
    scrimElement.classList.add('scrim-open');
});

navbarCloseButton.addEventListener('click', () => {
    navbar.classList.remove('navbar-show');
    scrimElement.classList.remove('scrim-open');
});

userButton.addEventListener('click', () => {
    loginRegisterWrapper.classList.add('active-popup');
    loginRegister.classList.add('active-popup');
})

genderLink.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();

        const gender = link.dataset.genderCategories;
        const genderArray = [gender];
        localStorage.setItem('gender', JSON.stringify(genderArray));
        localStorage.removeItem('brand');

        window.location.href = "shop.html";
    });
});

export function updateHeaderCartQuantity() {
    const itemsCount = calculateCartQuantity();

    document.querySelector('.cart-items-count').innerHTML = itemsCount;
}

updateHeaderCartQuantity();