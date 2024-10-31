// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaShoppingCart } from "react-icons/fa";
import "../navbar/NavBar.css";
import logo from '../../image/logo.png';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img src={logo} alt="Logo" width="150" height="75" />
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="navbar-icons">
        <Link to="/cart" className="navbar-icon">
          <FaShoppingCart />
        </Link>
        <Link to="/register" className="navbar-icon">
          <FaUserPlus />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
