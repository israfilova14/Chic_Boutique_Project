import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../admin/message';
import ProgressSteps from '../progress_steps';
import Loader from '../../loader';
import { clearCartItems } from '../../../../redux/features/cart/cartSlice';
import { useCreateOrderMutation } from '../../../../redux/api/orderApiSlice';

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
  
      // Sifariş uğurla yaradıldıqdan sonra
      dispatch(clearCartItems()); // Səbəti boşaltmaq
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
      <div className="container mx-auto mt-8">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-1 py-2 text-left">Image</th>
                  <th className="px-1 py-2 text-left">Product</th>
                  <th className="px-1 py-2 text-left">Quantity</th>
                  <th className="px-1 py-2 text-left">Price</th>
                  <th className="px-1 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover"
                      />
                    </td>
                    <td className="p-2 text-left">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </td>
                    <td className="p-2 text-left">{item.qty}</td>
                    <td className="p-2 text-left">${item.price.toFixed(2)}</td>
                    <td className="p-2 text-left">
                      ${(item.qty * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
              <div className="p-8 bg-gray-800 text-white">
                <ul>
                  <li>Items: ${cart.itemsPrice}</li>
                  <li>Shipping: ${cart.shippingPrice}</li>
                  <li>Tax: ${cart.taxPrice}</li>
                  <li>Total: ${cart.totalPrice}</li>
                </ul>
                {error && <Message variant="danger">{error?.data?.message}</Message>}
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
                  <p>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                  <strong>{cart.paymentMethod}</strong>
                </div>
                <button
                  type="button"
                  className="bg-green-500 text-white py-2 px-4 rounded-full mt-4 w-full"
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
                {isLoading && <Loader />}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceOrder;
