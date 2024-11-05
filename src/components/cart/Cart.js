import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, getTotalPrice } from '../cart/CartUtils';
import './Cart.css';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCartItems(getCart());
        setTotalPrice(getTotalPrice());
    }, []);

    const handleRemove = (productId) => {
        removeFromCart(productId);
        setCartItems(getCart()); // Refresh the cart items
        setTotalPrice(getTotalPrice()); // Refresh the total price
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <p className="total-price">Total Price: R.S {totalPrice}</p>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-list">
                    {cartItems.map((item) => (
                        <div key={item.videoGameInfoId} className="cart-item">
                            <img src={item.gamePicturePath} alt={item.gameName} className="cart-item-image" />
                            <div className="cart-item-details">
                                <p className="cart-item-name">{item.gameName}</p>
                                <p className="cart-item-price">Price: R.S {item.videoGameVersions[0].price}</p>
                                <button onClick={() => handleRemove(item.videoGameInfoId)} className="remove-button">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
