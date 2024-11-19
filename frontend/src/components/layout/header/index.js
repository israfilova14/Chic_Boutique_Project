import React, {useEffect} from 'react';
import { useGetTopProductQuery } from '../../../redux/api/productApiSlice';
import Loader from '../../pages/loader';
import SmallProduct from '../../pages/small_product';
import ProductCarousel from '../../pages/product_carousel';

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
    <div>
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