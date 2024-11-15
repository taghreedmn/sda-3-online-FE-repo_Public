import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/HomePage';
import Login from './components/userInfo/LogIn';
import Register from './pages/RegisterPage';
import Cart from './components/cart/Cart';
import LayOut from './components/layout/LayOut';
import AdminProfile from './components/userInfo/AdminProfile';
import GameDetail from './components/games/GameDetail';
import { useState, useEffect } from "react";
import axios from "axios";
import Games from "./pages/GamesPage";
import UserProfile from "./components/userInfo/UserProfile";
import ProtectedRoute from "./components/userInfo/ProtectedRoute";
import Dashboard from "./components/dashboard/Dashboard";
import ProductDashBoard from "./components/dashboard/ProductDashBoard";
import UserDashBoard from "./components/dashboard/UserDashBoard";
import OrderDashBoard from "./components/dashboard/OrderDashBoard";



function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [productList, setProductList] = useState({
    products: [],
    totalCount: 0,
  });

  const handleChange = (event, value) => {
    setPage(value);
  };
  let limit = 6;

  let offset = (page - 1) * limit;

  let url = `https://fusiontech-q0v4.onrender.com/api/v1/VideoGamesInfo/Detailed?MinPrice=${minPrice}&MaxPrice=${maxPrice}&Limit=${limit}&Offset=${offset}`;

  function getData() {
    axios.get(url)
      .then((response) => {
        setProductList({
          products: response.data.videoGamesInfos || [],
          totalCount: response.data.totalCount || 0
        });
        setLoading(false);
        console.log('API response:', response.data);
        console.log('Updated productList:', productList);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setError("Fail to fetch data");
        setLoading(false);
      });
  }
  // getData();
  useEffect(() => {
    getData();
  }, [offset, limit, minPrice, maxPrice,]);

  //https://fusiontech-q0v4.onrender.com/api/v1/SystemAdmin/Profile

  function getAdminData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("https://fusiontech-q0v4.onrender.com/api/v1/SystemAdmin/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAdminData(res.data);
        setIsUserDataLoading(false);
      })
      .catch((err) => {
        setIsUserDataLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    getAdminData();
  }, []);

  function getUserData() {
    setIsUserDataLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get("https://fusiontech-q0v4.onrender.com/api/v1/Customer/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        setIsUserDataLoading(false);
      })
      .catch((err) => {
        setIsUserDataLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    getUserData();
  }, []);

  let isAuthenticated = userData ? true : false;
  let isAdmin = adminData ? true : false;

  if (loading === true) {
    return <div>Please wait a second </div>
  }
  if (error) {
    return <div> {error} </div>
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut isAdmin={isAdmin} isAuthenticated={isAuthenticated} userData={userData} setUserData={setUserData} />,
      children: [
        {
          path: "/",
          element: <Home products={productList.products} />,
        },
        {
          path: "/Register",
          element: < Register />,
        },
        {
          path: "/Login",
          element: < Login getUserData={getUserData} getAdminData={getAdminData} isAdmin={isAdmin} isAuthenticated={isAuthenticated} />,
        },
        {
          path: "/Games",
          element: < Games products={productList.products} totalCount={productList.totalCount}
            page={page} limit={limit} handleChange={handleChange}
            setMinPrice={setMinPrice} setMaxPrice={setMaxPrice}
            minPrice={minPrice} maxPrice={maxPrice} />,
        },
        {
          path: "/GamesDetail",
          element: < GameDetail />,
        },
        {
          path: "/Cart",
          element: < Cart />,
        },
        {
          path: "/Profile",
          element:
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAuthenticated={isAuthenticated}
              isAdmin={isAdmin}
              element={< UserProfile userData={userData} setUserData={setUserData} />} />,
        },
        {
          path: "/AdminProfile",
          element:
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAdmin={isAdmin}
              shouldCheckAdmin={true}
              element={< AdminProfile AdminData={adminData} setAdminData={setAdminData} />} />,
        },
        {
          path: "/dashboard",
          element:
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAdmin={isAdmin}
              shouldCheckAdmin={true}
              element={<Dashboard />}
            />,
        },
        {
          path: "/ProductDashboard",
          element:
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAdmin={isAdmin}
              shouldCheckAdmin={true}
              element={<ProductDashBoard />}
            />,
        },
        {
          path: "/UserDashBoard",
          element:
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAdmin={isAdmin}
              shouldCheckAdmin={true}
              element={<UserDashBoard />}
            />,
        },
        {
          path: "/OrderDashBoard",
          element:
            <ProtectedRoute
              isUserDataLoading={isUserDataLoading}
              isAdmin={isAdmin}
              shouldCheckAdmin={true}
              element={<OrderDashBoard />}
            />,
        },


      ],
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
