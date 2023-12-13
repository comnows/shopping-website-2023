const sliderContainer = document.querySelector('.slider-container');
const sliderWrapper = document.querySelector('.slider-wrapper');
const slideWidth = sliderContainer.querySelector('.slide').offsetWidth;

const sliderPrevButton = sliderContainer.querySelector('.js-slider-button-prev');
const sliderNextButton = sliderContainer.querySelector('.js-slider-button-next');

let isDragging = false;
let startX;
let startScrollLeft;

sliderPrevButton.addEventListener('click', () => {
    console.log(slideWidth);
    sliderWrapper.scrollLeft -= slideWidth;
});

sliderNextButton.addEventListener('click', () => {
    console.log(slideWidth);
    sliderWrapper.scrollLeft += slideWidth;
});

sliderContainer.addEventListener('mousedown', dragStart);
sliderContainer.addEventListener('mousemove', sliderDragging);
document.addEventListener('mouseup', dragStop);

function dragStart(e) {
    isDragging = true;
    sliderWrapper.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = sliderWrapper.scrollLeft;
}

function sliderDragging(e) {
    if(!isDragging) return;
    sliderWrapper.scrollLeft = startScrollLeft - (e.pageX - startX);
}

function dragStop() {
    isDragging = false;
    sliderWrapper.classList.remove('dragging');
}