import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import './Dashboard.css';

export default function OrderDashBoard() {
    const [orderList, setOrderList] = useState({
        orders: [],
        totalCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let url = "http://localhost:5125/api/v1/Order/all";

    function fetchData() {
        const token = localStorage.getItem("token");
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setOrderList({
                    orders: response.data.orders || [],
                    totalCount: response.data.totalCount || 0
                });
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch data");
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, [])

    // console.log(uList.users)

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {/* Render a single UserItem component with all users */}
            <OrderItem
                order={orderList.orders}
                totalCount={orderList.totalCount}
            />
        </div>
    );
}
