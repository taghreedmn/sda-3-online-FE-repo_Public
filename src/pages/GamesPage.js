import React from 'react'
import Games from '../components/games/Games';

export default function GamesPage (prop) {
  return (
    <div>
      <Games products={prop.products} /> 
    </div>
  )
}