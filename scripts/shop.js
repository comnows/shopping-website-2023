import { products } from "../data/products.js";

const filterButton = document.querySelector('.filter-button');
const sidebar = document.querySelector('.sidebar');
const sidebarCloseButton = document.querySelector('.sidebar-close-button');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const collapsibleHeader = document.querySelectorAll('.collapsible-header');
const filterCheckbox = document.querySelectorAll('.option');
const genderCheckbox = document.querySelectorAll('.js-gender-option');
const brandCheckbox = document.querySelectorAll('.js-brand-option');

let genderFilter = [];
let brandFilter = [];

function addSidebarKidsLink() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    if(params.get('ages')) {
        sidebarLinks.forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();

                window.location.href = "shop.html?categories=" + link.dataset.categories + "&ages=Kids";
            });
        });
    }
}

filterButton.addEventListener('click', () => {
    if(window.innerWidth > 960) {
        sidebar.classList.toggle('open');
    } else {
        sidebar.classList.add('sidebar-show');
    }
});

sidebarCloseButton.addEventListener('click', () => {
    sidebar.classList.remove('sidebar-show');
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
        localStorage.setItem('brand', JSON.stringify(brandFilter));
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

    console.log(array);
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
    let filterProducts = products;

    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    let categories = params.get('categories');
    let ages = params.get('ages');

    if(categories){
        filterProducts = filterProducts.filter((product) => {
            return product.category === categories;
        });
    }

    if(ages) {
        filterProducts = filterProducts.filter((product) => {
            return product.ages === ages;
        });
    }

    if(genderFilter.length > 0) {
        filterProducts = filterProducts.filter((product) => {
            return genderFilter.includes(product.gender);
        });
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

    const productsData = filterProducts();

    productsData.forEach((product) => {
        productsHTML += `
            <div class="product-preview">
                <a href="product.html?productId=${product.id}">
                    <div class="product">
                        <img class="product-image" src="${product.image}" alt="">
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
                </a>
            </div>
        `;
    });

    document.querySelector('.products-grid').innerHTML = productsHTML;
}

addSidebarKidsLink();
loadFiltersFromStorage();