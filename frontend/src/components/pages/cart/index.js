import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {FaTrash} from 'react-icons/fa';
import {addToCart, removeFromCart} from '../../../redux/features/cart/cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const {cartItems} = cart;

  const addToCartHandler = (product, qty) => {
     dispatch(addToCart({...product, qty}));
  }

  const removeFromHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
     navigate('/signin?redirect=/shipping');
  }
  return ( 
    <div>
      <div className='container flex justify-around items-start flex-wrap mt-4'>
         {
             cartItems.length === 0 
                   ? 
              (
              <div className='w-[30rem] h-[9rem] bg-white flex items-center justify-center'>
                 <p className='font-semibold text-neutral-900'>
                  Your cart is empty {"  "}<Link to='/shop' className='text-[#1DB954]'>Go To Shop</Link>
                 </p>
              </div>
              ) 
                   : 
              (
              <div className='flex flex-col w-[80%]'>
                  <h1 className='text-xl font-semibold mb-4'>Shopping Cart</h1>
                  {
                    cartItems.map((item) => (
                      <div key={item._id} className='flex items-center mb-[1rem] pb-2'>
                        <div className='w-[12rem] h-[12rem]'>
                          <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded'/>
                        </div>
                        <div className='flex-1 ml-4'>
                            <Link to={`/product/${item._id}`} className='text-pink-600 text-lg font-semibold'>
                              {item?.name}
                            </Link>
                            <div className='mt-2 text-white'>{item?.brand}</div>
                            <div className='mt-2 text-white'>${item?.price}</div>
                        </div>
                        <div className='w-24'>
                            <select 
                              className='w-full p-1 border rounded bg-[#4a4a4a] text-white' 
                              value={item.qty} 
                              onChange={e => addToCartHandler(item, Number(e.target.value))}
                              >
                              {[...Array(item.countInStock).keys()].map((x) => {
                                return (
                                  <option value={x + 1} key={x + 1} className='bg-[#333333] text-white'>
                                    {x  + 1}
                                  </option>
                                )
                              })}
                            </select>
                        </div>
                        <div>
                            <button 
                            className='text-red-600 mr-[5rem]'
                            onClick={() => removeFromHandler(item._id)}
                            >
                              <FaTrash className='ml-[1rem] mt-[0.5rem]'/>
                            </button>
                        </div>
                      </div>
                    ))
                  }
                  <div className='mt-8 w-[40rem]'>
                    <div className='p-4 rounded-lg'>
                        <h2 className='text-xl font-semibold mg-2'>
                            Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                        </h2>
                        <div className='text-2xl font-bold'>
                            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </div>
                        <button 
                          className='bg-[#1DB954] hover:bg-[#1C741C] mt-4 py-2 px-4 rounded-full w-full'
                          disabled={cartItems.length === 0}
                          onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </button>
                    </div>
                  </div>
              </div>
              )
            }
      </div>
    </div>
  )
}

export default Cart