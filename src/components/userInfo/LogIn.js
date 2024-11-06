import React, {useState} from 'react'
import './SignForm.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function LogIn() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const handleSubmit = (e) => {
        const logUrl = "http://localhost:5125/api/v1/Person/signIn";

        const dataToSend = {
            personEmail: formData.email,
            personPassword: formData.password,
        };

        axios.post(logUrl, dataToSend)
            .then((res) => {
                console.log(res, "response from post")
                if (res.status === 200) {
                    navigate("/");
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
        console.log("Login Data: ", formData)
    };
  return (
      <div className='sign-container'>
          <h2>Login</h2>
          <form >
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
              <button type='Submit' onClick={handleSubmit}>Login</button>

          </form>
    </div>
  )
}
