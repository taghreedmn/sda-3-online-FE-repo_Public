import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/HomePage';
import LayOut from './components/layout/LayOut';
import { useState, useEffect } from "react";
import axios from "axios";



function App() {
  const url = "https://mocki.io/v1/31eaa9af-edbc-4121-9163-0a1f671adb02";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productList, setProductList] = useState([]);
  const allProducts = productList;

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
        
      ],
    },
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
