import { getProduct } from "../data/products.js";

function renderProduct() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    const productId = params.get('productId');

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
                <div class="product-size-grid">
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-5-w-6-5">
                        <label for="m-5-w-6-5">
                            M 5 / W 6.5
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-5-5-w-7">
                        <label for="m-5-5-w-7">
                            M 5.5 / W 7
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-6-w-7-5">
                        <label for="m-6-w-7-5">
                            M 6 / W 7.5
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-6-5-w-8">
                        <label for="m-6-5-w-8">
                            M 6.5 / W 8
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-7-w-8-5">
                        <label for="m-7-w-8-5">
                            M 7 / W 8.5
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-7-5-w-9">
                        <label for="m-7-5-w-9">
                            M 7.5 / W 9
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-8-w-9-5">
                        <label for="m-8-w-9-5">
                            M 8 / W 9.5
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-8-5-w-10">
                        <label for="m-8-5-w-10">
                            M 8.5 / W 10
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-9-w-10-5">
                        <label for="m-9-w-10-5">
                            M 9 / W 10.5
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-9-5-w-11">
                        <label for="m-9-5-w-11">
                            M 9.5 / W 11
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-10-w-11-5">
                        <label for="m-10-w-11-5">
                            M 10 / W 11.5
                        </label>
                    </div>
                    <div class="product-size-option">
                        <input type="radio" name="size" id="m-10-5-w-12">
                        <label for="m-10-5-w-12">
                            M 10.5 / W 12
                        </label>
                    </div>
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

    const productQuantityInput = document.querySelector('.product-quantity-input');

    productQuantityInput.addEventListener('change', () => {
        const inputValue = parseFloat(productQuantityInput.value);

        if(isNaN(inputValue) || typeof(inputValue) !== 'number' || inputValue < 1) {
            productQuantityInput.value = 1;
        } else if(inputValue > 20) {
            productQuantityInput.value = 20;
        } else if(inputValue % 1 !== 0) {
            productQuantityInput.value = Math.round(inputValue);
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
    })
}

renderProduct();