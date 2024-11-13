import React from 'react'
import Home from '../components/home/Home'

export default function HomePage(prop) {
  const {products} = prop;
  return (
    <div>
      <Home products={products} />
    </div>
  );
}
