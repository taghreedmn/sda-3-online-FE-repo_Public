import React from 'react'

import NavBar from '../navbar/NavBar';
// import Footer from '../footer/Footer';
import { Outlet } from "react-router-dom";

export default function LayOut(prop) {
  const { isAdmin } = prop;
  return (
    <div>
      <NavBar isAdmin={isAdmin} />
        <Outlet />
        {/* <Footer /> */}
    </div>
  );
}
