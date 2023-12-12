const sliderContainer = document.querySelector('.slider-container');
const sliderWrapper = document.querySelector('.slider-wrapper');
const slideWidth = sliderContainer.querySelector('.slide').offsetWidth;

const sliderPrevButton = sliderContainer.querySelector('.js-slider-button-prev');
const sliderNextButton = sliderContainer.querySelector('.js-slider-button-next');

sliderPrevButton.addEventListener('click', () => {
    console.log(slideWidth);
    sliderWrapper.scrollLeft -= slideWidth;
});

sliderNextButton.addEventListener('click', () => {
    console.log(slideWidth);
    sliderWrapper.scrollLeft += slideWidth;
});