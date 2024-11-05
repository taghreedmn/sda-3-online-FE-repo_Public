import { get } from "react-hook-form";

export const getCart = () =>{

    const cart = localStorage.getItem('cart');
    return cart? JSON.parse(cart) : [];
}; 

export const addToCart = (game) => {
    const cart = getCart();
    cart.push(game);
    localStorage.setItem('cart', JSON.stringify(cart));

};
export const removeFromCart = (gameId) => {
    const cart = getCart().filter(item => item.videoGameInfoId !== gameId);
    localStorage.setItem('cart', JSON.stringify(cart));
};
export const getTotalPrice = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.videoGameVersions[0].price, 0)
};
export const getTotalItemCount = () => {
    const cart = getCart();
    return cart.length;
};
