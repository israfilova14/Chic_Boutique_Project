import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useGetProductsQuery } from '../../../redux/api/productApiSlice';
import Loader from '../../helpers/loader';
import Header from '../../layout/header';
import Message from '../../helpers/message';
import Product from '../products/product';
import Footer from '../../layout/footer';

const Home = () => {
  const {keyword} = useParams();
  const {data, isLoading, isError} = useGetProductsQuery({keyword});
  console.log(data);
  
  return (
    <div>
       {!keyword ? <Header/> : null}
       {isLoading ? (<Loader/>) : isError ? (<Message variant='danger'>
        {isError?.data.message || isError.error}
       </Message>)
       :
       (
        <>
        <div className='flex justify-between items-center'>
           <h1 className='ml-[20rem] mt-[5rem] text-[1.7rem] font-medium'>
              Special Products
           </h1>
           <Link to='/shop' className='bg-pink-600 text-white font-bold rounded-full py-2 px-10 mr-[18rem] mt-[5rem]'>
            Shop
           </Link>
        </div>
        <div className='flex flex-wrap items-center gap-[30px] w-[80%] mx-auto mt-[1rem]'>
            {
              data.products.map((product) => (
                <div key={product._id}>
                   <Product product={product}/>
                </div>
              ))
            }
        </div>
        <Footer/>
        </>
       )
       }
    </div>
  )
}

export default Home