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

export function addToCart(productId, sizeName, sizeId, quantity) {
    let matchingProduct;

    cart.forEach((cartItem) => {
        if (`${cartItem.productId}-${cartItem.size.id}` === `${productId}-${sizeId}`) {
            matchingProduct = cartItem;
        }
    });

    if (matchingProduct) {
        matchingProduct.quantity += Number(quantity);
    } else {
        cart.push({
            productId: productId,
            size: {
                name: sizeName,
                id: sizeId
            },
            quantity: Number(quantity)
        });
    }

    saveToStorage();
    console.log(cart);
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

export function calculateCartQuantity() {
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
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