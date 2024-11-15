import React, { useEffect, useState } from 'react';
import { getCart, removeFromCart, getTotalPrice, updateCart } from './CartUtils';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Cart.css';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    // Fetch cart data and calculate total price
    useEffect(() => {
        setCartItems(getCart());
        setTotalPrice(getTotalPrice());
        fetchPaymentMethods();
    }, []);

    // Fetch payment methods from the API
    const fetchPaymentMethods = async () => {
        try {
            const response = await axios.get("https://fusiontech-q0v4.onrender.com/api/v1/Payment");
            setPaymentMethods(response.data || []);
        } catch (error) {
            console.error("Error fetching payment methods:", error);
            alert("Failed to load payment methods.");
        }
    };

    // Handle quantity change for a product
    const handleQuantityChange = (productId, quantity) => {
        if (quantity <= 0) return; // Prevent negative or zero quantity
        updateCart(productId, quantity);
        setCartItems(getCart()); // Refresh the cart items
        setTotalPrice(getTotalPrice()); // Refresh the total price
    };

    // Handle removing a product from the cart
    const handleRemove = (productId) => {
        removeFromCart(productId);
        setCartItems(getCart()); // Refresh the cart items
        setTotalPrice(getTotalPrice()); // Refresh the total price
    };

    // Handle completing the order
    const handleCompleteOrder = async () => {
        if (!selectedPaymentMethod) {
            alert("Please select a payment method.");
            return;
        }
        const token = localStorage.getItem("token");
        const storeId = "b15664cd-da73-46bf-a47f-7be46fdd346a"; // Replace with actual store ID if needed
        const paymentId = selectedPaymentMethod.paymentId; // Assuming the API returns an "id" for the payment method
        const orderedGames = cartItems.map(item => ({
            videoGameVersionID: item.videoGameVersions[0].videoGameVersionId, // Assuming this field exists
            quantity: item.quantity
        }));

        const orderData = {
            employeeId: 1001, // Replace with the actual employee ID if needed
            storeId,
            paymentId,
            orderedGames
        };

        try {
            const response = await axios.post("https://fusiontech-q0v4.onrender.com/api/v1/Order", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(orderData, "order data");
            console.log("Order successfully placed:", response.data);

            // Clear the cart in local storage and reset the state
            localStorage.removeItem("cart"); // Assuming the cart is stored in localStorage
            setCartItems([]); // Empty the cart state
            setTotalPrice(0); // Reset the total price

            Swal.fire({
                text: "Thank you for your order!",
                icon: "success",
                timer: 3000,
                button: false,
                customClass: {
                    popup: 'neon-popup',
                    title: 'neon-title',
                    content: 'neon-content',
                    icon: 'neon-icon'
                },
                willClose: () => {
                }
            }); 
        } catch (error) {
            console.error("Error completing order:", orderData);
            alert("Failed to complete the order.");
        }
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

                                {/* Quantity Input */}
                                <input
                                    type="number"
                                    value={item.quantity || 1}
                                    min="1"
                                    onChange={(e) => handleQuantityChange(item.videoGameInfoId, parseInt(e.target.value))}
                                    className="quantity-input"
                                />

                                {/* Remove Button */}
                                <button onClick={() => handleRemove(item.videoGameInfoId)} className="remove-button">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Complete Order Button */}
            {cartItems.length > 0 && (
                <>
                    <div className="payment-method-container">
                        <label htmlFor="payment-method">Choose Payment Method:</label>
                        <select
                            id="payment-method"
                            value={selectedPaymentMethod ? selectedPaymentMethod.id : ""}
                            onChange={(e) => {
                                const selectedPayment = paymentMethods.find(
                                    (method) => method.paymentId === e.target.value
                                );
                                setSelectedPaymentMethod(selectedPayment);
                            }}
                        >
                            <option value="">Select Payment Method</option>
                            {paymentMethods.map((method) => (
                                <option key={method.paymentId} value={method.paymentId}>
                                    {method.paymentMethod} {/* Assuming name is the display name */}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button onClick={handleCompleteOrder} className="complete-order-button">
                            Complete Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
} 