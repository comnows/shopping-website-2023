import { cart, updateQuantity, removeFromCart } from "../data/cart.js";
import { getProduct } from "../data/products.js";

export function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);

        cartSummaryHTML += `
            <div class="cart-item">
                <div class="product-image">
                    <img src="${matchingProduct.image}" alt="">
                </div>
                <div class="product-info">
                    <p class="product-name">
                        ${matchingProduct.name}
                    </p>
                    <p class="product-size">
                        Size: ${cartItem.size}
                    </p>
                    <div class="product-total-small">
                        &#3647;${matchingProduct.price}
                    </div>
                </div>
                <div class="product-quantity">
                    <span class="decrease js-decrease-button" data-product-id="${productId}-${cartItem.size.id}">
                        -
                    </span>
                    <input type="text" class="product-quantity-input js-quantity-input" data-product-id="${productId}-${cartItem.size.id}" value="${cartItem.quantity}" min="1" max="20"">
                    <span class="increase js-increase-button" data-product-id="${productId}-${cartItem.size.id}">
                        +
                    </span>
                </div>
                <div class="product-total">
                    &#3647;${matchingProduct.price}
                </div>
                <div class="product-delete js-product-delete" data-product-id="${productId}-${cartItem.size.id}">
                    <i class="fa-solid fa-trash"></i>
                </div>
            </div>
        `;
    });

    document.querySelector('.cart-items-container').innerHTML = cartSummaryHTML;

    document.querySelectorAll(`.js-quantity-input`).forEach((input) => {
        input.addEventListener('change', () => {
            const productId = input.dataset.productId;

            let inputValue = parseFloat(input.value);
    
            if(isNaN(inputValue) || typeof(inputValue) !== 'number' || inputValue < 1 || inputValue > 20) {
                alert('Quantity must be at least 1 and less than 20');
                return;
            } else if(inputValue % 1 !== 0) {
                inputValue = Math.round(inputValue);
            }

            updateQuantity(productId, inputValue);
            renderOrderSummary();
        });
    });

    document.querySelectorAll('.js-decrease-button').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            let matchingProduct;
            
            cart.forEach((cartItem) => {
                if (`${cartItem.productId}-${cartItem.size.id}` === productId) {
                    matchingProduct = cartItem;
                }
            });

            if (matchingProduct.quantity === 1) { return; }

            const newQuantity = matchingProduct.quantity - 1;

            updateQuantity(productId, newQuantity);
            renderOrderSummary();
        });
    });

    document.querySelectorAll('.js-increase-button').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            let matchingProduct;
            
            cart.forEach((cartItem) => {
                if (`${cartItem.productId}-${cartItem.size.id}` === productId) {
                    matchingProduct = cartItem;
                }
            });

            if (matchingProduct.quantity === 20) { return; }

            const newQuantity = matchingProduct.quantity + 1;

            updateQuantity(productId, newQuantity);
            renderOrderSummary();
        });
    });

    document.querySelectorAll('.js-product-delete').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;

            removeFromCart(productId);
            renderOrderSummary();
        });
    });
}

renderOrderSummary();