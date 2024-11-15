import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserItem from './UserItem';
import './Dashboard.css';

export default function UserDashBoard() {
    const [userList, setUserList] = useState({
        users: [],
        totalCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let url = "https://fusiontech-q0v4.onrender.com/api/v1/Customer?Limit=100&Offset=0";

    function fetchData() {
        const token = localStorage.getItem("token");
        axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setUserList({
                    users: response.data.customers || [],
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

    console.log(userList.users)

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {/* Render a single UserItem component with all users */}
            <UserItem
                user={userList.users}
                totalCount={userList.totalCount}
            />
        </div>
    );
}
