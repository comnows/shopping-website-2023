import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
    let productPrice = 0;
    let shippingPrice = 0;
    let cartItemCount = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPrice += product.price * cartItem.quantity;

        shippingPrice += product.price * 0.03;

        cartItemCount += cartItem.quantity;
    });

    const totalBeforeTax = productPrice + shippingPrice;
    const tax =  totalBeforeTax * 0.07;
    const total = totalBeforeTax + tax;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>
        <div class="payment-summary-row">
            <div>
                Items (${cartItemCount}):
            </div>
            <div class="payment-summary-money">
                &#3647;${formatCurrency(productPrice)}
            </div>
        </div>
        <div class="payment-summary-row">
            <div>
                Shipping & handling:
            </div>
            <div class="payment-summary-money">
                &#3647;${formatCurrency(shippingPrice)}
            </div>
        </div>
        <div class="payment-summary-row subtotal-row">
            <div>
                Total before tax:
            </div>
            <div class="payment-summary-money">
                &#3647;${formatCurrency(totalBeforeTax)}
            </div>
        </div>
        <div class="payment-summary-row">
            <div>
                Estimated tax (7%):
            </div>
            <div class="payment-summary-money">
                &#3647;${formatCurrency(tax)}
            </div>
        </div>
        <div class="payment-summary-row total-row">
            <div>
                Total:
            </div>
            <div class="payment-summary-money">
                &#3647;${formatCurrency(total)}
            </div>
        </div>
        <button class="checkout-button">
            Checkout
        </button>
    `;

    document.querySelector(".payment-summary").innerHTML = paymentSummaryHTML;
}