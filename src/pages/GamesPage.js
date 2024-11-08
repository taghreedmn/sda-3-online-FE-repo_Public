import React from 'react'
import Games from '../components/games/Games';

export default function GamesPage (prop) {
  return (
    <div>
      <Games products={prop.products} totalCount={prop.totalCount} page={prop.page} handleChange={prop.handleChange} /> 
    </div>
  )
}
