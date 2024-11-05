import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Games.css";

export default function Products({ products }) {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleClick = (product) => {
        navigate("/GamesDetail", {
            state: {
                gameId: product.videoGameInfoId,
            },
        });
    };

    // Filter products based on search term
    const filteredProducts = products.filter((product) =>
        product.gameName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="products-container">
            <input
                type="text"
                placeholder="Search games by name..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <button key={product.videoGameInfoId} className="product-card" onClick={() => handleClick(product)}>
                        <img src={product.gamePicturePath} alt={product.gameName} className="product-image" />
                        <p>{product.gameName}</p>
                        <p><strong>Price:</strong> {product.videoGameVersions[0].price} R.S</p>
                        <div className="rating">
                            <FontAwesomeIcon icon={faStar} className="star-icon" />
                            <span>{product.totalRating}</span>
                        </div>
                    </button>
                ))}
                
            </div>
        </div>
    );
}
