import React from 'react'
import Games from '../components/games/Games';
import PriceRangeForm from '../components/games/PriceRangeForm';

export default function GamesPage (prop) {
  return (
    <div>
      <PriceRangeForm setMinPrice={prop.setMinPrice}setMaxPrice={prop.setMaxPrice} minPrice = {prop.minPrice} maxPrice = {prop.maxPrice}/>
      <Games products={prop.products} totalCount={prop.totalCount} page={prop.page} handleChange={prop.handleChange} setMinPrice={prop.setMinPrice}
        setMaxPrice={prop.setMaxPrice} limit = {prop.limit}/> 
    </div>
  )
}
