// src/components/NavBar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaShoppingCart } from "react-icons/fa";
import { getTotalItemCount } from '../cart/CartUtils';
import "../navbar/NavBar.css";
import logo from '../../image/logo.png';

const NavBar = (prop) => {
  const { isAdmin, isAuthenticated, userData, setUserData } = prop;
  const [itemCount, setItemCount] = useState(getTotalItemCount());

  useEffect(() => {
    // Update count when localStorage changes
    const handleStorageChange = () => {
      setItemCount(getTotalItemCount());
    };
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const logOutHandler = (e) => {
    localStorage.removeItem("token")
    setUserData(null);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Logo" width="150" height="75" />
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/Games">Products</Link>
        <Link to="/About">About</Link>
        
        {isAdmin ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <p style={{ display: "none" }}>Dashboard</p>
        )}

      </div>
      <div className="navbar-icons">
        <Link to="/Cart" className="navbar-icon">
          <FaShoppingCart />
          {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
        </Link>
        {isAdmin ? (
          <form>
          <button type='Submit' onClick={logOutHandler} >log out</button>
          </form>
        ) : (
            <Link to="/register" className="navbar-icon">
              <FaUserPlus />
            </Link>
        )}
      </div>

    </nav>
  );
};

export default NavBar;
