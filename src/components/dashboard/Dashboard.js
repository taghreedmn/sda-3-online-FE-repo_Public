import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import ProductDashBoard from './ProductDashBoard';
import UserDashBoard from './UserDashBoard'; // Assuming you have a UserDashBoard component
import './Dashboard.css';
import OrderDashBoard from './OrderDashBoard';

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  fontSize: '1rem',
  padding: '10px 20px',
  color: '#ffffff',
  backgroundColor: '#2b2b2b',
  borderColor: '#4a4a4a',
}));

export default function Dashboard() {
  const [alignment, setAlignment] = useState('Products');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };


  return (
    <div className="dashboard-container">
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Dashboard Options"
        className="dashboard-toggle-group"
      >
        <CustomToggleButton value="Products">Products</CustomToggleButton>
        <CustomToggleButton value="Customers">Customers</CustomToggleButton>
        <CustomToggleButton value="Orders">Orders</CustomToggleButton>
      </ToggleButtonGroup>

      {/* Conditionally render the dashboard content based on alignment value */}
      <div className="dashboard-content">
        {alignment === 'Products' && <ProductDashBoard />}
        {alignment === 'Customers' && <UserDashBoard />}
        {alignment === 'Orders' && <OrderDashBoard />}
      </div>
    </div>
  );
}
