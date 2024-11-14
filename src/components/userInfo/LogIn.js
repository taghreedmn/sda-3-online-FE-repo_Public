import React, { useState } from 'react';
import './SignForm.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

export default function LogIn({ getUserData, getAdminData }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const logUrl = "http://localhost:5125/api/v1/Person/signIn";
        const dataToSend = {
            personEmail: formData.email,
            personPassword: formData.password,
        };

        axios.post(logUrl, dataToSend)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("token", res.data);

                    // Decode token to get user role
                    const decodedToken = jwtDecode(res.data);
                    console.log(decodedToken, "decodeToken")
                    const userRole = decodedToken.role;
                    const userName = decodedToken.PersonName;

                    // Check role and navigate accordingly
                    if (userRole === "SystemAdmin") {
                        getAdminData();
                        Swal.fire({
                            text: "Welcome Admin",
                            icon: "success",
                            timer: 3000,
                            button: false,
                            customClass: {
                                popup: 'neon-popup',
                                title: 'neon-title',
                                content: 'neon-content',
                                icon: 'neon-icon'
                            },
                            willClose: () => {
                            }
                        });
                        navigate('/AdminProfile');
                    } else {
                        getUserData();
                        Swal.fire({
                            text: "Welcome",
                            icon: "success",
                            timer: 3000,
                            button: false,
                            customClass: {
                                popup: 'neon-popup',
                                title: 'neon-title',
                                content: 'neon-content',
                                icon: 'neon-icon'
                            },
                            willClose: () => {
                            }
                        });
                        navigate('/');
                    }
                }
            })
            .catch((err) => {
                console.error("Login error:", err);
                if (err.response && err.response.status === 400) {
                    const errorData = err.response.data;
                    if (errorData.personEmail) {
                        alert(errorData.personEmail[0]);
                    }
                    if (errorData.personPassword) {
                        alert(errorData.personPassword[0]);
                    }
                }
            });
    };

    return (
        <div className='sign-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}
