import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Games.css';

export default function Products(prop) {
    //onClick={handleClick}
    const navigate = useNavigate();


    const handleClick = () => {
        navigate("/ProductDetail", {
            state: {
                product: prop.products
            }
        });
    };
    console.log('http://localhost:5125/images/Games/{videoGamesInfoGuidHelper}/{videoGamesInfoGuidHelper}.jpg');
    return (
        <div className="product-list">
            <div className="product-preview">
                {prop.products.map((product) => {
                    return (
                        <button className="product-card" onClick={handleClick}>
                            <img src={product.gamePicturePath} alt={product.gameName} className="product-image" />
                            <p >{product.gameName}</p>
                            <div>{product.price}</div>
                        </button>
                    );
                })}
            </div>
            
        </div>
    )
}