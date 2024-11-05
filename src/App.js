import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/HomePage';
import Login from './components/userInfo/LogIn';
import Register from './pages/RegisterPage';
import Cart from './components/cart/Cart';
import LayOut from './components/layout/LayOut';
import GameDetail from './components/games/GameDetail';
import { useState, useEffect } from "react";
import axios from "axios";
import Games from "./pages/GamesPage";



function App() {
  const url = "http://localhost:5125/api/v1/VideoGamesInfo/";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productList, setProductList] = useState({});


  function getData() {
    axios.get(url)
      .then((response) => {
        setProductList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
        setError("Fail to fetch data");
        setLoading(false);
      });
  }
  // getData();
  useEffect(() => {
    getData();
  }, []);

  if (loading === true) {
    return <div>Please wait a second </div>
  }
  if (error) {
    return <div> {error} </div>
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayOut />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Register",
           element: < Register />,
        }, 
        {
          path: "/Login",
          element: < Login />,
        },
        {
          path: "/Games",
          element: < Games products={productList} />,
        },
        {
          path: "/GamesDetail",
          element: < GameDetail/>,
        },
        {
          path: "/Cart",
          element: < Cart />,
        },
        
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
