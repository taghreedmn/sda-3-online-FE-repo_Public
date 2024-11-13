// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "./Home.css";  // Import Swiper styles

export default function Home({ products }) {
    const navigate = useNavigate();

    const handleClick = (product) => {
        navigate("/GamesDetail", {
            state: {
                gameId: product.videoGameInfoId,
            },
        });
    };

    return (
        <div className="home">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {products.map((product) => (
                    <SwiperSlide key={product.videoGameInfoId}>  {/* Wrap each product in SwiperSlide */}
                        <div
                            className="product-card"
                            onClick={() => handleClick(product)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={product.gamePicturePath}
                                alt={product.gameName}
                                className="product-image"
                            />
                            <h3>{product.gameName}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
