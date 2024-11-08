import React, { useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value} RS`;
}

export default function PriceRangeForm({ setMinPrice, setMaxPrice, minPrice, maxPrice }) {
    // Initialize local state for the price range
    const [priceRange, setPriceRange] = useState([minPrice || 0, maxPrice || 250]);

    // Handle price range change
    const handlePriceRangeChange = (event, newValue) => {
        setPriceRange(newValue);
        setMinPrice(newValue[0]);  // Update parent component's minPrice state
        setMaxPrice(newValue[1]);  // Update parent component's maxPrice state
    };

    return (
        <div>
            <p> Fliter by Price</p>
            <Box sx={{ width: 150 }}>
                <Slider
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={valuetext}
                    min={0}            // Minimum price
                    max={250}         // Maximum price (adjust this as per your requirements)
                    valueLabelDisplay="auto"
                    disableSwap       // Ensures that min doesn't go higher than max
                />
            </Box>
        </div>
    );
}
