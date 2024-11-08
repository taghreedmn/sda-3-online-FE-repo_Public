import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./Games.css";
import GamePagination from "./GamePagination";
import PriceRangeForm from "./PriceRangeForm";

export default function Products(prop) {
    const { products, totalCount, page, handleChange, setMaxPrice, setMinPrice } = prop;
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleClick = (product) => {
        navigate("/GamesDetail", {
            state: {
                gameId: product.videoGameInfoId,
            },
        });
        console.log('productId is from navigate', product.videoGameInfoId)
    };
    useEffect(() => {
        console.log("Received products prop in Games component:", products);
    }, [products]);

    const filteredProducts = (products || []).filter((product) =>
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
            <div className="filter-card">
                <PriceRangeForm setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
            </div>
            
            <div className="product-list">
                {filteredProducts.map((product) => (
                    console.log('productId is ',product.videoGameInfoId),
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
            <GamePagination totalCount={totalCount} page={page} handleChange={handleChange} />
        </div>
        
    );
}
