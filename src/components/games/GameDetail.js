import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addToCart } from '../cart/CartUtils';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Games.css';

export default function GamesDetail() {
    const location = useLocation();
    const { gameId } = location.state; // Get the game ID from navigation state
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function fetchGameDetail() {
        axios
            .get(`https://fusiontech-q0v4.onrender.com/api/v1/VideoGamesInfo/${gameId}`)
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

        Swal.fire({
            text: `${product.gameName} has been added to your cart!`,
            icon: "success",
            showConfirmButton: true,
            customClass: {
                popup: 'neon-popup',
                title: 'neon-title',
                content: 'neon-content',
                icon: 'neon-icon'
            },
        }).then(() => {

            window.location.reload();
        });
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!game) {
        return <div>No game details available.</div>;
    }

    return (
        <div className="game-detail-container">
            <h2>{game.gameName}</h2>
            <img src={game.gamePicturePath} alt={game.gameName} className="game-image" />
            <p><strong>Description:</strong> {game.description}</p>
            <p><strong>Price:</strong> {game.videoGameVersions[0].price} R.S</p>
            <p><strong>Rating:</strong> {game.totalRating}</p>
            <p><strong>Release Date:</strong> {game.yearOfRelease}</p>

            <button onClick={() => handleAddToCart(game)} className="add-to-cart-button">
                Add to Cart
            </button>
        </div>
    );
}
