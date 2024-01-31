import { addToCart } from "../data/cart.js";
import { getProduct } from "../data/products.js";
import { getSize } from "../data/sizes.js";
import { updateHeaderCartQuantity } from "./header.js";

function renderProduct() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    const productId = params.get('productId') || 'product_001';
    console.log(productId);

    const matchingProduct = getProduct(productId);

    let productHtml = '';

    productHtml = `
        <div class="product-image">
            <img src="${matchingProduct.image}" alt="">
        </div>
        <div class="product-info">
            <h1 class="product-name">
                ${matchingProduct.name}
            </h1>
            <div class="product-genre">
                ${matchingProduct.genre}
            </div>
            <div class="product-price">
                &#3647;${matchingProduct.price}
            </div>
            <div class="product-size">
                <div class="product-size-header">
                    Size (US)
                </div>
                <div class="product-size-grid ${matchingProduct.category.toLocaleLowerCase()}">
                    
                </div>
            </div>
            <div class="product-quantity">
                <span class="decrease">
                    -
                </span>
                <input type="text" id="" class="product-quantity-input" value="1" min="1" max="20">
                <span class="increase">
                    +
                </span>
            </div>
            <button class="add-to-cart-button">
                Add to cart
            </button>
            <div class="product-details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>
    `;

    document.querySelector('.product-container').innerHTML = productHtml;
    
    const matchingSize = getSize(matchingProduct.category);

    let sizeHtml = '';
    
    matchingSize.forEach((size) => {
        sizeHtml += `
            <div class="product-size-option">
                <input type="radio" name="size" id="${size.sizeId}" value="${size.name}" data-size-id="${size.sizeId}">
                <label for="${size.sizeId}">
                    ${size.name}
                </label>
            </div>
        `;
    });

    document.querySelector('.product-size-grid').innerHTML = sizeHtml;

    const productQuantityInput = document.querySelector('.product-quantity-input');

    productQuantityInput.addEventListener('change', () => {
        const inputValue = parseFloat(productQuantityInput.value);

        if(isNaN(inputValue) || typeof(inputValue) !== 'number' || inputValue < 1) {
            alert('Quantity must be at least 1 and less than 20');
            productQuantityInput.value = 1;
            return;
        } else if (inputValue > 20) {
            productQuantityInput.value = 20;
        } else if(inputValue % 1 !== 0) {
            inputValue = Math.round(inputValue);
        }
    });

    const quantityDecrease = document.querySelector('.decrease');
    const quantityIncrease = document.querySelector('.increase');

    quantityDecrease.addEventListener('click', () => {
        productQuantityInput.value--;

        if(productQuantityInput.value <= 0) {
            productQuantityInput.value = 1;
        }
    });

    quantityIncrease.addEventListener('click', () => {
        productQuantityInput.value++;

        if(productQuantityInput.value > 20) {
            productQuantityInput.value = 20;
        }
    });

    document.querySelector(".add-to-cart-button").addEventListener('click', () => {
        const selectedSize = document.querySelector('input[name="size"]:checked');

        if (!selectedSize) {
            alert("Please select your size...");
            return;
        }

        const sizeName = selectedSize.value;
        const sizeId = selectedSize.dataset.sizeId;

        addToCart(productId, sizeName, sizeId, productQuantityInput.value);
        updateHeaderCartQuantity();
    });
}

renderProduct();