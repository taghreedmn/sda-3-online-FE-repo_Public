export const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart ? cart : []; // Return an empty array if no cart data exists
};


export const addToCart = (product) => {
    const cart = getCart();
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.videoGameInfoId === product.videoGameInfoId);

    if (existingProductIndex >= 0) {
        // If it exists, update the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If it doesn't exist, add a new product to the cart
        const newProduct = { ...product, quantity: 1 };
        cart.push(newProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.videoGameInfoId !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const getTotalPrice = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.videoGameVersions[0].price * (item.quantity || 1), 0);
};

export const updateCart = (productId, quantity) => {
    const cart = getCart();
    const updatedCart = cart.map(item =>
        item.videoGameInfoId === productId ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const getTotalItemCount = () => {
    const cart = getCart();
    return cart.reduce((count, item) => count + (item.quantity || 1), 0);
};
