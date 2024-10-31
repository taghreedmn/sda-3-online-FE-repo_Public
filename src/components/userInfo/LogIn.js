import React, {useState} from 'react'
import './SignForm.css';

export default function LogIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login Data: ", formData)
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
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
              />
              <button type='Submit' >Login</button>
              
          </form>
    </div>
  )
}
