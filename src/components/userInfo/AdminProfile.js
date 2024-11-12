import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function AdminProfile(prop) {
    const {AdminData, setAdminData } = prop;
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    // const [userForm , setUserForm] = useState({
    //   username: "",
    //   email: "",
    //   phone: "",
    // });
    const handleChange = (e) => {
        // setFormData({ ...userData, [e.target.name]: e.target.value })
    };
    const logOutHandler = (e) => {
        localStorage.removeItem("token")
        setAdminData(null);
    };

    console.log("User data from profile", AdminData)

    return (
        <div>
            <div className='sign-container'>
                <h2>Profile</h2>
                <form >
                    <input
                        type="email"
                        name="email"
                        value={AdminData.personEmail}
                        required
                    />
                    <input
                        type="text"
                        name="PersonName"
                        value={AdminData.personName}
                        required
                    />
                    <input
                        type="text"
                        name="PhoneNumber"
                        value={AdminData.personPhoneNumber}
                        required
                    />
                    <button type='Submit' onClick={handleChange}>Update</button>
                    <button type='Submit' onClick={logOutHandler} >log out</button>

                </form>
            </div>
        </div>
    )
}
