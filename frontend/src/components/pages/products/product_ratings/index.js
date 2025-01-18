import React from 'react';
import {FaRegStar, FaStar, FaStarHalfAlt} from 'react-icons/fa';


const ProductRating = ({value, text, color}) => {
  const fullStar = Math.floor(value);
  const halfStar = value - fullStar > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStar -halfStar;

  return (
    <div className='flex items-center'>
       {[...Array(fullStar)].map((_, index) => (
          <FaStar key={index} className={`text-[#1eb554] ml-1`} size={20}/>
       ))}

       {halfStar === 1 && <FaStarHalfAlt className={`text-[#1eb554] ml-1`} size={20}/>}

       {
        [...Array(emptyStar)].map((_, index) => (
          <FaRegStar key={index} className={`text-[#1eb554] ml-1`} size={20}/>
        ))
       }
       <span className={`rating-text ml-[2rem]`}>{text && text}</span>
    </div>
  )
}

ProductRating.defaultProps = {
  color: '#1eb554'
}

export default ProductRating