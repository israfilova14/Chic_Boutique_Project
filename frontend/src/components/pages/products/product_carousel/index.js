import React from 'react';
import { useGetTopProductQuery } from '../../../../redux/api/productApiSlice.js';
import Message from '../../../helpers/message/index.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore
} from 'react-icons/fa';

const ProductCarousel = () => {
  const {data: products, isLoading, error} = useGetTopProductQuery();
  console.log(products);
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  }
  return (
    <div className='mt-[1rem] xl:block lg:block md:block'>
        {
          isLoading 
          ? null 
          : error 
          ?
          (
            <Message>
                {error?.data?.message || error?.message}
            </Message>
          ) 
          : 
          (
            <Slider {...settings} className='xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm-block'>
               {
                products.map(({image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock}) => (
                  <div key={_id}>
                      <img src={image} alt={name} className='w-[90%] rounded-lg object-cover h-[30rem]'/>
                      <div className='flex justify-between w-[20rem]'>
                         <div className='one'>
                             <h2>{name}</h2>
                             <p>${price}</p><br/>
                             <p className='w-[25rem]'>{description.substring(0, 170)}</p>
                         </div>
                         <div className='flex justify-between w-[20rem]'>
                            <div className='one'>
                                <h1 className='flex items-center mb-6 w-[15rem]'>
                                   <FaStore className='mr-2  text-white' size={20}/> Brand: {brand}
                                </h1>
                                <h1 className='flex items-center mb-6 w-[15rem]'>
                                   <FaClock className='mr-2  text-white' size={20}/> Added: {moment(createdAt).fromNow()}
                                </h1>
                                <h1 className='flex items-center mb-6 w-[8rem]'>
                                   <FaStar className='mr-2 text-white' size={20}/> Reviews: {numReviews}
                                </h1>
                            </div>
                            <div className='two'>
                               <h1 className='flex items-center mb-6 w-[10rem]'>
                                  <FaStar className='mr-2 text-white' size={20}/> Ratings: {Math.round(rating)}
                               </h1>
                               <h1 className='flex items-center mb-6 w-[10rem]'>
                                  <FaShoppingCart className='mr-2 text-white' size={20}/> Quantity: {quantity}
                               </h1>
                               <h1 className='flex items-center mb-6 w-[10rem]'>
                                  <FaStar className='mr-2 text-white' size={20}/> In Stock: {countInStock}
                               </h1>
                            </div>
                         </div>
                      </div>
                  </div>
                ))
               }
            </Slider>
          )
        }
    </div>
  )
}

export default ProductCarousel