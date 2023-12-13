const sliderContainer = document.querySelector('.slider-container');
const sliderWrapper = document.querySelector('.slider-wrapper');
let slideWidth = sliderContainer.querySelector('.slide').offsetWidth;
const sliderChildrens = [...sliderWrapper.children];

const sliderPrevButton = sliderContainer.querySelector('.js-slider-button-prev');
const sliderNextButton = sliderContainer.querySelector('.js-slider-button-next');

let isMouseDown = false;
let isDragging = false;
let startX;
let startScrollLeft;
let positionDiff;
let sliderTimeoutId;

sliderChildrens.slice(-1).forEach(card => {
    sliderWrapper.insertAdjacentHTML('afterbegin', card.outerHTML);
});

sliderChildrens.slice(0, 1).forEach(card => {
    sliderWrapper.insertAdjacentHTML('beforeend', card.outerHTML);
});

sliderPrevButton.addEventListener('click', () => {
    sliderWrapper.scrollLeft -= slideWidth;
});

sliderNextButton.addEventListener('click', () => {
    sliderWrapper.scrollLeft += slideWidth;
});

sliderContainer.addEventListener('mousedown', dragStart);
sliderContainer.addEventListener('mousemove', sliderDragging);
document.addEventListener('mouseup', dragStop);
sliderWrapper.addEventListener('scroll', infiniteScroll);
sliderContainer.addEventListener('mouseenter', () => clearTimeout(sliderTimeoutId));
sliderContainer.addEventListener('mouseleave', autoPlay);

function dragStart(e) {
    isMouseDown = true;
    startX = e.pageX;
    startScrollLeft = sliderWrapper.scrollLeft;
}

function sliderDragging(e) {
    if(!isMouseDown) return;
    sliderWrapper.classList.add('dragging');
    // isDragging = true;
    positionDiff = e.pageX - startX;
    sliderWrapper.scrollLeft = startScrollLeft - positionDiff;
}

function dragStop() {
    isMouseDown = false;
    sliderWrapper.classList.remove('dragging');

    // if(!isDragging) return;
    // isDragging = false;
    // autoSlide();
}

function infiniteScroll() {
    if(sliderWrapper.scrollLeft === 0) {
        sliderWrapper.classList.add('no-transition');
        sliderWrapper.scrollLeft = sliderWrapper.scrollWidth - (2 * sliderWrapper.offsetWidth);
        sliderWrapper.classList.remove('no-transition');
    } else if(sliderWrapper.scrollLeft === sliderWrapper.scrollWidth - sliderWrapper.offsetWidth) {
        sliderWrapper.classList.add('no-transition');
        sliderWrapper.scrollLeft = sliderWrapper.offsetWidth;
        sliderWrapper.classList.remove('no-transition');
    }

    clearTimeout(sliderTimeoutId);
    if(!sliderContainer.matches(':hover')) autoPlay();
}

function autoPlay() {
    if(window.innerWidth < 800) return;

    sliderTimeoutId = setTimeout(() => sliderWrapper.scrollLeft += slideWidth, 2500);
}

autoPlay();

function autoSlide() {
    if(sliderWrapper.scrollLeft == (sliderWrapper.scrollWidth - sliderWrapper.clientWidth)) return;
    
    positionDiff = Math.abs(positionDiff);
    let diff = slideWidth - positionDiff;

    if(sliderWrapper.scrollLeft > startScrollLeft)
    {
        return sliderWrapper.scrollLeft += positionDiff > slideWidth / 3 ? diff : -positionDiff;
    }
    
    sliderWrapper.scrollLeft -= positionDiff > slideWidth / 3 ? diff : -positionDiff;
}

window.addEventListener('resize', () => {
    slideWidth = sliderContainer.querySelector('.slide').offsetWidth;
});