import React from 'react';
import { useSelector } from 'react-redux';
import {selectFavoriteProduct} from "../../../../redux/features/favorites/favoriteSlice";
import Product from '../product';

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className='ml-[10rem]'>
       <h2 className='text-2xl font-semibold mb-[1rem] mt-[2rem]'>
          Favorite <span className='text-[#1DB954]'>Products.</span>
       </h2>
       {
         favorites.length > 0 ? 
         (
            <div className='flex flex-wrap gap-10'>  
                {
                  favorites.map((product) => (
                    <Product key={product._id} product={product}/>
                  ))
                }
          </div>
         )
         :
         (
            <div className='w-[30rem] h-[9rem] bg-white shadow rounded-lg flex items-center justify-center'>
                <p className='font-semibold text-neutral-900'>Your favorites box is empty</p>
            </div>
         )
       }
    </div>
  )
}

export default Favorites