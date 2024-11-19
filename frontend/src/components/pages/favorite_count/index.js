import React from 'react';
import { useSelector } from 'react-redux'; 

const FavoriteCount = () => {
  const favorites = useSelector(state => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div  className='absolute left-3 top-9'>
       {
        favoriteCount > 0 && 
        (
          <span className='px-2 py-0 text-sm text-white bg-pink-600 rounded-full'>
            {favoriteCount}
          </span>
        )
       }
    </div>
  )
}

export default FavoriteCount