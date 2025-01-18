import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useAllProductsQuery } from '../../../../redux/api/productApiSlice';
import AdminMenu from '../admin_menu';
import Loader from '../../../helpers/loader/index.js';

const AllProducts = () => {
  const {data: products, isLoading, isError} = useAllProductsQuery();
  console.log(products);
  
  if(isLoading){
     return <Loader/>
  }

  if(isError){
     return <div>Error handling products</div>
  }

  return (
    <div className='container ml-[6rem]'>
       <div className='flex flex-col md:flex-row'>
          <div className='p-3'>
             <div className='text-center text-xl font-semibold h-12'>
                 All <span className='text-[#1DB954]'> Products ({products.length})</span>
             </div>
             <div className='flex flex-wrap justify-evenly items-center'>
                {products?.map((product) => (
                  <div key={product._id}  className='w-[520px] h-[200px] block mb-4 overflow-hidden bg-white rounded-lg'>
                      <div className='flex'>
                         <img src={product.image} alt={product.name} className='w-[180px] h-[180px] object-cover mix-blend-multiply'/>
                         <div className='p-4 flex flex-col justify-around'>
                             <div className='flex justify-between'>
                                 <h5 className='text-lg font-semibold mb-2 text-neutral-900'>
                                    {product?.name}
                                 </h5>
                                 <p className='text-gray-900 text-sm'>
                                    {moment(product.createAt).format("MMMM Do YYYY")}
                                 </p>
                             </div>
                             <p className='text-gray-900 text-sm mb-4'>
                              {
                                product?.description
                              }
                             </p>
                             <div className='flex justify-between'>
                                <Link 
                                 to={`/admin/update-product/${product._id}`}
                                 className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800
                                 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'
                                 >
                                   Update Product
                                 </Link>
                                 <p>${product?.price}</p>
                             </div>
                         </div>
                      </div>
                  </div>
                ))}
             </div>
          </div>
            <div className='md:w-1/4 p-3 mt-2'>
               <AdminMenu/>
            </div>  
       </div>
    </div>
  )
}

export default AllProducts