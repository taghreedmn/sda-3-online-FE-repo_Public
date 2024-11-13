import React from 'react'

import NavBar from '../navbar/NavBar';
// import Footer from '../footer/Footer';
import { Outlet } from "react-router-dom";

export default function LayOut(prop) {
  const { isAdmin, isAuthenticated, userData, setUserData } = prop;
  return (
    <div>
      <NavBar isAdmin={isAdmin} isAuthenticated={isAuthenticated} userData={userData} setUserData={setUserData} />
        <Outlet />
        {/* <Footer /> */}
    </div>
  );
}
