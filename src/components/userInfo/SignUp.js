import React, {useState} from 'react'
import './SignForm.css';
import { Link } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    });
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Register Data: ", formData)
    };
  return (
    <div className='sign-container'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input 
            type= "text"
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
            <button type='Submit' >Register</button>
              <h5>Already have account? <Link to="/Login">Login</Link></h5>
        </form>
    </div>
  )
}
