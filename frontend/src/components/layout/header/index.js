import React, {useEffect} from 'react';
import { useGetTopProductQuery } from '../../../redux/api/productApiSlice';
import Loader from '../../helpers/loader';
import SmallProduct from '../../pages/products/small_product';
import ProductCarousel from '../../pages/products/product_carousel/index';

const Header = () => {
  const {data, isLoading, error} = useGetTopProductQuery();
  console.log(data);
  if(isLoading){
    return <Loader/>
  }
  if(error){
    return <h1>Error</h1>
  };
  return (
    <div className='ml-[6rem]'>
      <h2 className='text-2xl font-semibold ml-[2rem]'>Chic <span className='text-[#1DB954]'>Boutique</span></h2>
      <div className='flex justify-around'>
        <div className='xl:block lg:hidden md: hidden'>
           <div className='grid grid-cols-2'>
             {data?.map((product) => (
              <div key={product._id}>
                   <SmallProduct product={product}/>
              </div>
             ))}
           </div>
        </div>
        <ProductCarousel/>
      </div>
    </div>
  )
}

export default Header