import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../../helpers/message/index.js';
import ProgressSteps from '../../../helpers/progress_steps/index.js';
import Loader from '../../../helpers/loader/index.js';
import { clearCartItems } from '../../../../redux/features/cart/cartSlice';
import { useCreateOrderMutation} from '../../../../redux/api/orderApiSlice';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
  
      dispatch(clearCartItems());  
      toast.success("Order placed successfully!");
      navigate(`/order/${res._id}`);
    } catch (err) {
      console.error("Order error:", err);
      toast.error(err?.data?.message || "Failed to place order.");
    }
  };
  

  return (
    <div>
      <ProgressSteps step1 step2 step3 />
      <div className="container ml-[6rem] mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) 
        : 
        (
          <div className="overflow-x-auto">
            <table className="w-[80%] bg-white text-black">
              <thead>
                <tr>
                  <th className="px-1 py-2 text-center border border-black font-semibold">Image</th>
                  <th className="px-1 py-2 text-center border border-black font-semibold">Product</th>
                  <th className="px-1 py-2 text-center border border-black font-semibold">Quantity</th>
                  <th className="px-1 py-2 text-center border border-black font-semibold">Price</th>
                  <th className="px-1 py-2 text-center border border-black font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-black">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover mx-auto"
                      />
                    </td>
                    <td className="p-2 text-center border border-black">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2 text-center border border-black">{item.qty}</td>
                    <td className="p-2 text-center border border-black">${item.price.toFixed(2)}</td>
                    <td className="p-2 text-center border border-black">
                      ${(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='mt-8 bg-white text-neutral-900 w-[80%] rounded-lg p-2'>
                      <h2 className='text-lg font-semibold mb-2'>Order Summary</h2>
                      <div className='flex justify-between flex-wrap p-2 rounded-md'>
                        <ul className='text-md'>
                           <li>
                             <span className='font-medium mb-1'>Items:</span>{"   "}{cart?.cartItems[0]?.qty}
                           </li>
                           <li>
                             <span className='font-medium mb-1'>Shipping:</span>{"   "}${cart?.cartItems[0]?.shippingPrice}
                           </li>
                           <li>
                             <span className='font-medium mb-1'>Tax:</span>{"   "}${cart?.taxPrice}
                           </li>
                           <li>
                             <span className='font-medium mb-1'>Total:</span>{"   "}${cart?.cartItems[0]?.price}
                           </li>
                        </ul>
                        {
                          error && <Message variant='danger'>{error?.data?.message}</Message>
                        }
                        <div>
                           <h2 className='text-lg mb-1'>Shipping</h2>
                           <p>
                             <strong>Address:</strong>{" "}
                             {cart.shippingAddress.address}{" "}
                             {cart.shippingAddress.city}{" "},
                             {cart.shippingAddress.postalCode}{" "},
                             {cart.shippingAddress.country}
                           </p>
                        </div>
                        <div>
                           <h2 className='text-lg mb-1'>Payment Method</h2>
                           <strong>Method:</strong>
                           {cart.paymentMethod}
                        </div>
                      </div>
                      <button 
                        type='button' 
                        className='bg-[#d81b60] hover:bg-[#c2185b] text-white py-2 px-4 rounded text-md w-[30rem] mt-4' 
                        disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}
                      >
                         Plase Order
                      </button>
                      {
                        isLoading && <Loader/>
                      }
                  </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
