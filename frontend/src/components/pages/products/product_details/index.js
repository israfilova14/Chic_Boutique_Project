import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../../../../redux/api/productApiSlice.js';
import Loader from '../../../helpers/loader/index.js';
import Message from '../../../helpers/message/index.js';
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa';
import moment from 'moment';
import HeartIcon from '../heart_icon';
import ProductRating from '../product_ratings';
import ProductTab from '../../../pages/products/product_tap/index.js';
import { addToCart } from '../../../../redux/features/cart/cartSlice';

const InfoRow = ({ icon: Icon, label, value }) => (
  <h1 className='flex items-center mb-6'>
    <Icon className='mr-2' />{label}: {value}
  </h1>
);

const ProductDetails = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispath = useDispatch()
  const navigate = useNavigate();

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success('Review created successfully!');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.message || 'Something went wrong');
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Message variant='danger'>{error?.data?.message || error.message}</Message>;
  
  const addToCartHandler = () => {
    dispath(addToCart({...product, qty}));
    navigate('/cart');
 }

  return (
    <div>
      <Link to='/' className='text-white font-semibold hover:underline ml-[10rem]'>Go Back</Link>
      <div className='flex flex-wrap relative items-between mt-[2rem] ml-[10rem]'>
        <div>
          <img
            src={product?.image}
            alt={product?.name}
            className='w-[48rem] xl:w-[45rem] lg:w-[42rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] h-[36rem]'
          />
          <HeartIcon product={product} />
        </div>
        <div className='flex flex-col'>
          <h2 className='text-3xl font-extrabold'>{product?.name}</h2>
          <p className='my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]'>{product?.description}</p>
          <p className='text-3xl my-4 font-extrabold'>Price: ${product?.price}</p>
          <div className='flex items-center justify-between w-[20rem]'>
            <div>
              <InfoRow icon={FaStore} label="Brand" value={product?.brand} />
              <InfoRow icon={FaClock} label="Added" value={moment(product?.createdAt).fromNow()} />
              <InfoRow icon={FaStar} label="Reviews" value={product?.numReviews} />
            </div>
            <div>
              <InfoRow icon={FaStar} label="Ratings" value={product?.rating} />
              <InfoRow icon={FaShoppingCart} label="Quantity" value={product?.quantity} />
              <InfoRow icon={FaBox} label="In Stock" value={product?.countInStock} />
            </div>
          </div>
          <div className='flex justify-between flex-wrap'>
            <ProductRating value={product?.rating} text={`${product?.numReviews} reviews`} />
            {product?.countInStock > 0 && (
              <div>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className='p-2 w-[6rem] rounded-lg text-black'
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className='btn-container'>
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className='bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0'
            >
              Add To Cart
            </button>
          </div>
        </div>
        <div className='mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]'>
          <ProductTab
            loadingProductReview={loadingProductReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            product={product}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
