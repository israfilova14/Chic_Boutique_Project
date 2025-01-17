import React from 'react';
import { useSelector } from 'react-redux';
import {selectFavoriteProduct} from "../../../../redux/features/favorites/favoriteSlice";
import Product from '../product';

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className='ml-[10rem]'>
       <h1 className='text-xl font-semibold ml-[3rem] mb-[1rem] mt-[2rem]'>
          FAVORITE PRODUCTS
       </h1>
       <div className='flex flex-wrap gap-10'>  
          {
            favorites.map((product) => (
              <Product key={product._id} product={product}/>
            ))
          }
       </div>
    </div>
  )
}

export default Favorites