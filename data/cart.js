export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [
        {
            productId: "product_001",
            size: {
                name: "L",
                id: "shirt-l"
            },
            quantity: 1
        },
        {
            productId: "product_001",
            size: {
                name: "M",
                id: "shirt-m"
            },
            quantity: 1
        }
    ];
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (`${cartItem.productId}-${cartItem.size.id}` !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (`${cartItem.productId}-${cartItem.size.id}` === productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.quantity = newQuantity;

    saveToStorage();
}