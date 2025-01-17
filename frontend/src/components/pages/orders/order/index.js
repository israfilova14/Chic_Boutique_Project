import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../../../helpers/message/index.js';
import Loader from '../../../helpers/loader/index.js';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation
} from '../../../../redux/api/orderApiSlice';

const Order = () => {
  const { id: orderId } = useParams();
  
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);
  
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadingPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD"
          }
        });
        paypalDispatch({ type: "setLoadingStatus", value: 'pending' });
        console.log("I am order id", orderId);
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadingPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      toast.success("Order marked as delivered");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Order is paid');
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    });
  }

  function createOrder(data, actions) {
    return actions.order.create({
      purchase_units: [{ amount: { value: order.totalPrice } }]
    }).then((orderId) => {
      return orderId;
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  // Loading and error handling
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error?.data?.message || "Something went wrong."}</Message>;
  }

  if (!order) {
    return <Message variant="danger">Order not found.</Message>;
  }

  return (
    <div>
      <div className='container flex flex-col ml-[10rem] md:flex-row'>
        <div className='md:w-2/3 pr-4'>
          <div className='border-gray-300 mt-5 pb-4 mb-5'>
            {
              order?.orderItems?.length === 0
                ? <Message>Order is empty</Message>
                : (
                  <div className='overflow-x-auto'>
                    <table className='w-[80%]'>
                      <thead className='border-b-2'>
                        <tr>
                          <th className='p-2'>Image</th>
                          <th className='p-2'>Product</th>
                          <th className='p-2 text-center'>Quantity</th>
                          <th className='p-2'>Unit Price</th>
                          <th className='p-2'>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          order?.orderItems?.map((item, index) => (
                            <tr key={index}>
                              <td className='p-2'>
                                <img 
                                  src={item?.image} 
                                  alt={item?.name} 
                                  className='w-16 h-16 object-cover'
                                />
                              </td>
                              <td className='p-2 text-center'>
                                <Link to={`/product/${item.product}`}>
                                  {item?.name}
                                </Link>
                              </td>
                              <td className='p-2 text-center'>
                                {item?.qty}
                              </td>
                              <td className='p-2 text-center'>
                                ${item?.price}
                              </td>
                              <td className='p-2 text-center'>
                                ${(item?.qty * item?.price).toFixed(2)}
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
        </div>

        <div className='md:w-1/3'>
          <div className='mt-5 border-gray-300 pb-4 mb-4'>
            <h2 className='text-xl font-bold mb-2'>Shipping</h2>
            <p className='mb-4 mt-4'>
              <strong className='text-pink-500'>Order:</strong> {order?._id}
            </p>
            <p className='mb-4'>
              <strong className='text-pink-500'>Name:</strong> {order?.user?.username}
            </p>
            <p className='mb-4'>
              <strong className='text-pink-500'>Email:</strong> {order?.user?.email}
            </p>
            <div className='mb-4'>
              <strong className='text-pink-500'>Address: </strong> 
              {order?.shippingAddress.address}, {order?.shippingAddress.city}, {""}
              {order?.shippingAddress?.postalCode}, {" "}
              {order?.shippingAddress?.country}, {" "}
            </div>
            <p className='mb-4'>
              <strong className='text-pink-500'>Method:</strong> {order?.paymentMethod}
            </p>
            {
              order?.isPaid 
              ? <Message variant='success' className='text-pink-500'>Paid on {order?.paidAt}</Message>
              : <Message variant='danger' className='text-pink-500'>Not paid</Message>
            }
          </div>

          <h2 className='text-xl font-bold mb-2 mt-[3rem]'>Order Summary</h2>
          <div className='flex justify-between mb-2'>
            <span>Items</span>
            <span>${order?.itemsPrice}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span>Shipping</span>
            <span>${order?.shippingPrice}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span>Tax</span>
            <span>${order?.taxPrice}</span>
          </div>
          <div className='flex justify-between mb-2'>
            <span>Total</span>
            <span>${order?.totalPrice}</span>
          </div>

          {
            !order.isPaid && (
              <div>
                {loadingPayPal && <Loader />}
                {isPending ? <Loader /> : (
                  <div>
                    <PayPalButtons 
                      createOrder={createOrder} 
                      onApprove={onApprove} 
                      onError={onError}
                    />
                  </div>
                )}
              </div>
            )
          }

          {
            loadingDeliver && <Loader />
          }

          {
            userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <div>
                <button type='button' className='bg-pink-500 text-white w-full py-2' onClick={deliverHandler}>
                  Mark As Delivered
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Order;
