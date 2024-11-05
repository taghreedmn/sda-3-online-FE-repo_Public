// src/components/GamesDetail.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../cart/CartUtils';
import axios from 'axios';
import './Games.css';

export default function GamesDetail() {
    const location = useLocation();
    const { gameId } = location.state; // Get the game ID from navigation state
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    function fetchGameDetail() {
        axios
            .get(`http://localhost:5125/api/v1/VideoGamesInfo/${gameId}`)
            .then((response) => {
                setGame(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Error fetching game details.");
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchGameDetail();
    }, [gameId]);

    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`${product.gameName} has been added to your cart!`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    console.log(game)
    return (
        <div className="game-detail-container">
            {game.map((gameDetail)=>(
                <div>
                    <h2>{gameDetail.gameName}</h2>
                    <img src={gameDetail.gamePicturePath} alt={gameDetail.gameName} className="game-image" />
                    <p><strong>Description:</strong> {gameDetail.description}</p>
                    <p><strong>Price:</strong> {gameDetail.videoGameVersions[0].price} R.S</p>
                    <p><strong>Rating:</strong> {gameDetail.totalRating}</p>
                    <p><strong>Release Date:</strong> {gameDetail.yearOfRelease}</p>
                    <button onClick={() => handleAddToCart(gameDetail)} className="add-to-cart-button">Add to Cart</button>
                </div>
            ))}
            
        </div>
    );
}
