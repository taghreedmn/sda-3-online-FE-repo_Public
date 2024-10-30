// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
// import SearchBar from "../search/SearchBar";
import "../navbar/NavBar.css";
import logo from '../../image/logo.png';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo"><img src={logo} alt="Girl in a jacket" width="150" height="75" /></Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      {/* <SearchBar onSearch={onSearch} /> */}
      <Link to="/cart" className="navbar-cart">
        <FaShoppingCart />
      </Link>
    </nav>
  );
};

export default NavBar;