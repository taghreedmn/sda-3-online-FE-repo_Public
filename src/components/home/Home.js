// src/components/Home.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Home({ products }) {
    const navigate = useNavigate();

    const handleClick = (product) => {
        navigate(`/ProductDetail/${product.id}`, {
            state: { product }
        });
    };

    return (
        <div className="home">
            <h1>Welcome to the Game Store</h1>
            <p>Check out our latest products:</p>
            {/* <div className="product-preview">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => handleClick(product)}
                        style={{ cursor: "pointer" }}
                    >
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div> */}
            
        </div>
    );
};
