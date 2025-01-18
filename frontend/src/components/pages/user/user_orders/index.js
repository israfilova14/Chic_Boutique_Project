import React from 'react';
import Message from '../../../helpers/message/index.js';
import Loader from '../../../helpers/loader/index.js';
import { Link } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../../../../redux/api/orderApiSlice';

const UserOrders = () => {
  const {data: orders, isLoading, error} = useGetUserOrdersQuery();

  return (
    <div className='container ml-[6rem]'>
      <h2 className='text-2xl font-semibold mb-4'>My <span className='text-[#1DB954]'>Orders.</span></h2>
      {
        isLoading 
        ? 
        (
        <Loader/>
        ) 
        : 
        error 
        ? 
        (<Message variant='danger'>{error?.data?.error || error.error}</Message>)
        :
        (
          <table className='w-[80%] bg-white text-black'>
             <thead>
              <tr>
                 <td className='py-2 border border-[#2c2c2c] text-center'>IMAGE</td>
                 <td className='py-2 border border-[#2c2c2c] text-center'>ID</td>
                 <td className='py-2 border border-[#2c2c2c] text-center'>DATE</td>
                 <td className='py-2 border border-[#2c2c2c] text-center'>TOTAL</td>
                 <td className='py-2 border border-[#2c2c2c] text-center'>PAID</td>
                 <td className='py-2 border border-[#2c2c2c] text-center'>DELIVERED</td>
                 <td className='py-2 border border-[#2c2c2c] text-center'>DETAILS</td>
              </tr>
             </thead>
             <tbody>
                 {
                  orders?.map((order) => (
                    <tr key={order._id}>
                        <td className='border border-[#2c2c2c]'> 
                          <img 
                            src={order.orderItems[0].image}
                            alt={order?.user}
                            className='w-[100px] h-[100px] mb-2 mt-2 mx-auto'
                          />
                        </td>
                        <td className='border border-[#2c2c2c] text-center'>
                           {order?._id}
                        </td>
                        <td className='border border-[#2c2c2c] text-center'>
                           {order?.createdAt.substring(0, 10)}
                        </td>
                        <td className='border border-[#2c2c2c] text-center'>
                           $ {order?.totalPrice}
                        </td>
                        <td className='border border-[#2c2c2c]'>
                            {order?.isPaid 
                            ? 
                            (
                              <p className='p-1 text-center bg-green-600 w-[6rem] rounded-full text-white mx-auto'>
                                 Completed
                              </p>
                            )
                          :
                          (
                            <p className='p-1 text-center bg-red-600 w-[6rem] rounded-full text-white mx-auto'>
                                 Pending
                            </p>
                          )}
                        </td>
                        <td className='border border-[#2c2c2c]'>
                            {order?.isDelivered ? (
                                 <p className='p-1 text-center bg-green-600 w-[6rem] rounded-full text-white mx-auto'>
                                 Completed
                              </p>
                            )
                          :
                          (
                            <p className='p-1 text-center bg-red-600 w-[6rem] rounded-full text-white mx-auto'>
                               Pending
                         </p>
                          )}
                        </td>
                        <td className='border border-[#2c2c2c]'>
                           <Link to={`/order/${order._id}`}>
                              <p className='w-[120px] bg-[#d51f69] hover:bg-[#C2185B] text-center text-white py-1 px-2 rounded-full mx-auto'>
                                View Details
                              </p>
                           </Link>
                        </td>
                    </tr>
                  ))
                 }
             </tbody>
          </table>
        )
      }
    </div>
  )
}

export default UserOrders