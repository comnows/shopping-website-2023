import { products } from "../data/products.js";

const filterButton = document.querySelector('.filter-button');
const sidebar = document.querySelector('.sidebar');
const collapsibleHeader = document.querySelectorAll('.collapsible-header');
const filterCheckbox = document.querySelectorAll('.option');
const genderCheckbox = document.querySelectorAll('.js-gender-option');
const brandCheckbox = document.querySelectorAll('.js-brand-option');

let genderFilter = [];
let brandFilter = [];

filterButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

collapsibleHeader.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('open');
    });
});

filterCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('checked');
    });
});

genderCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        toggleValueInArray(genderFilter, checkbox.dataset.gender);
        localStorage.setItem('gender', JSON.stringify(genderFilter));
        renderProducts();
    });
});

brandCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        toggleValueInArray(brandFilter, checkbox.dataset.brand);
        localStorage.setItem('brand', JSON.stringify(genderFilter));
        renderProducts();
    });
});

function toggleValueInArray(array, value) {
    if(array.includes(value)) {
        const index = array.indexOf(value);
        array.splice(index, 1);
    } else {
        array.push(value);
    }
}

function loadFiltersFromStorage() {
    genderFilter = JSON.parse(localStorage.getItem('gender'));

    if(!genderFilter) {
        genderFilter = [];
    }

    genderFilter.forEach((gender) => {
        if(gender === 'Men') {
            document.querySelector('.js-men-option').classList.toggle('checked');
        } else {
            document.querySelector('.js-women-option').classList.toggle('checked');
        }
    });

    brandFilter = JSON.parse(localStorage.getItem('brand'));

    if(!brandFilter) {
        brandFilter = [];
    }

    brandFilter.forEach((brand) => {
        if(brand === 'Adidas') {
            document.querySelector('.js-adidas-option').classList.toggle('checked');
        } else {
            document.querySelector('.js-nike-option').classList.toggle('checked');
        }
    });

    renderProducts();
}

function filterProducts() {
    let filterProducts;

    if(genderFilter.length > 0) {
        filterProducts = products.filter((product) => {
            return genderFilter.includes(product.gender);
        });
    } else {
        filterProducts = products;
    }
    
    if(brandFilter.length > 0) {
        filterProducts = filterProducts.filter((product) => {
            return brandFilter.includes(product.brand);
        });
    }

    return filterProducts;
}

function renderProducts() {
    let productsHTML = '';

    const products = filterProducts();

    products.forEach((product) => {
        productsHTML += `
            <div class="product-preview">
                <div class="product">
                    <a href="">
                        <img class="product-image" src="${product.image}" alt="">
                    </a>
                </div>
                <div class="product-info">
                    <p class="product-name">
                        ${product.name}
                    </p>
                    <p class="product-genre">
                        ${product.genre}
                    </p>
                    <p class="product-price">
                        &#3647;${product.price}
                    </p>
                </div>
            </div>
        `;
    });

    document.querySelector('.products-grid').innerHTML = productsHTML;
}

loadFiltersFromStorage();