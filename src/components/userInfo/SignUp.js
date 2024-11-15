import React, { useState } from 'react'
import './SignForm.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phone: "",
        age: ""
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const handleSubmit = (e) => {
        const userUrl = "https://fusiontech-q0v4.onrender.com/api/v1/Customer";

        const dataToSend = {
            personName: formData.username,
            personEmail: formData.email,
            personPassword: formData.password,
            PersonPhoneNumber: formData.phone, // Assuming the phone should include the '+' symbol
            profilePicturePath: "", // If not provided, set to empty string
            age: parseInt(formData.age, 10),
        };

        axios.post(userUrl, dataToSend)
            .then((res) => {
                console.log(res, "response from post")
                if (res.status === 200) {
                    navigate("/Login");
                }
            })
            .catch((err) => {
                console.log(err)
                if (err === 400) {

                    if (err.response.data.personEmail) {
                        alert(err.response.data.personEmail[0]);
                        return;
                    }
                    if (err.response.data.personPassword) {
                        alert(err.response.data.personPassword[0]);
                        return;
                    }


                }
            });

        e.preventDefault();
        console.log("Register Data: ", formData)
    };
    return (
        <div className='sign-container'>
            <h2>Register</h2>
            <form >
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
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
                <input
                    type="tel"
                    name="phone"
                    placeholder="+966555555555"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="age"
                    min="0" max="120"
                    placeholder='Age'
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                <button type='Submit' onClick={handleSubmit}>Register</button>
                <h5>Already have account? <Link to="/Login">Login</Link></h5>
            </form>
        </div>
    )
}
