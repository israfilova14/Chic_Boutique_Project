import React from 'react';
import Message from '../../../helpers/message/index.js';
import Loader from '../../../helpers/loader';
import { Link } from 'react-router-dom';
import { useGetUserOrdersQuery } from '../../../../redux/api/orderApiSlice';
import AdminMenu from '../admin_menu';

const OrderList = () => {
  const {data: orders, isLoading, error} = useGetUserOrdersQuery();
   console.log("orders", orders);
 
  return (
    <div className='ml-[6rem]'>
      {isLoading 
       ?
       (<Loader/>)
       :
       error
       ?
       (<Message variant='danger'>{error?.data?.message || error?.error}</Message>)
       :
       (
         <div>
               <AdminMenu/>
               <h2 className='text-2xl font-semibold'>Order <span className='text-[#1DB954]'>List.</span></h2>
              <table className='container w-[85%] mt-[20px] bg-white text-black'>
                <thead>
                  <tr>
                    <th className='text-center font-semibold border border-black p-2'>
                        ITEMS
                    </th>
                    <th className='text-center font-semibold border border-black'>
                        ID
                    </th>
                    <th className='text-center font-semibold border border-black'>
                        USER
                    </th>
                    <th className='text-center font-semibold border border-black'>
                        DATE
                    </th>
                    <th className='text-center font-semibold border border-black'>
                        TOTAL
                    </th>
                    <th className='text-center font-semibold border border-black'>
                        PAID
                    </th>
                    <th className='text-center font-semibold border border-black'>
                      DELIVERED
                    </th>
                    <th className='text-center font-semibold border border-black'>
                      MORE
                    </th>
                  </tr>
                </thead>
                <tbody>
                    {
                      orders?.map((order) => (
                        <tr key={order._id}>       
                              <td className='border border-black'>
                                <img src={order?.orderItems[0].image} alt={order?._id} className='w-[100px] h-[100px] pt-2 pb-2 mx-auto'/>
                              </td>
                            <td className='text-center border border-black'>{order?._id}</td>
                            <td className='text-center border border-black'>{order?.user ? order?.user : "N/A"}</td>
                            <td className='text-center border border-black'>
                                {
                                  order?.createdAt ? order.createdAt.substring(0, 10) : 'N/A'
                                }
                            </td>
                            <td className='text-center border border-black'>${order.totalPrice}</td>
                            <td className='border border-black'>
                                  {order?.isPaid 
                                  ? 
                                  (
                                    <p className='p-1 text-center bg-green-400 w-[120px] rounded-full mx-auto text-white'>
                                      Completed
                                    </p>
                                  )
                                :
                                (
                                  <p className='p-1 text-center bg-red-600 w-[120px] rounded-full mx-auto text-white'>
                                      Pending
                                  </p>
                                )}
                              </td>
                              <td className='border border-black'>
                                  {order?.isPaid 
                                  ? 
                                  (
                                    <p className='p-1 text-center bg-green-400 w-[120px] rounded-full mx-auto text-white'>
                                      Completed
                                    </p>
                                  )
                                :
                                (
                                  <p className='p-1 text-center bg-red-600 w-[120px] rounded-full mx-auto text-white'>
                                      Pending
                                  </p>
                                )}
                              </td>
                              <td className='border border-black'>
                                <Link to={`/order/${order._id}`}>
                                  <p className='p-1 w-[70px] rounded-full text-center bg-[#1DB954] text-white mx-auto'>More</p>
                                </Link>
                              </td>
                        </tr>
                      ))
                    }
                </tbody>
              </table>
         </div>
       )
      }
    </div>
  )
}

export default OrderList