import React from 'react';
import './style.css';
import { useState } from 'react';
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin, 
  AiOutlineUserAdd, 
  AiOutlineShoppingCart,
  AiFillShopping
} from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation} from '../../../redux/api/usersApiSlice';
import { logout } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import FavoriteCount from '../../pages/favorite_count';

const Navigation = () => {
  const {userInfo} = useSelector(state => state.auth);
  const {cartItems} = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  const closeSidebar = () => {
    setShowSidebar(false)
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
      try{
          await logoutApiCall().unwrap();
          dispatch(logout());
          toast.success('Logout successfully !')
          navigate("/signin");
      }
      catch(err){
          console.error(err)
      }
  }

  return (
    <div 
      style={{ zIndex: 999 }} 
      className={`flex flex-col justify-between p-4 text-white bg-[#0D0D0D] h-[100vh] fixed transition-all ease-in-out 
        ${showSidebar ? 'hidden' : 'w-[5%] xl:w-[5%] lg:w-[5%] md:w-[5%] sm:w-[5%] hover:w-[15%]'} `}
      id='navigation-container'
    >
      <div className='flex flex-col justify-center space-y-4'>
        <Link 
          to={'/'}
          className='flex items-center transition-transform transform hover:translate-x-2 group'
        >
          <AiOutlineHome className='mr-2 mt-[3rem]' size={26} />
          <span className='hidden nav-item-name mt-[3rem] text-white group-hover:block'>HOME</span> 
        </Link>
        <Link 
          to={'/shop'}
          className='flex items-center transition-transform transform hover:translate-x-2 group'
        >
          <AiOutlineShopping className='mr-2 mt-[3rem]' size={26} />
          <span className='hidden nav-item-name mt-[3rem] group-hover:block'>SHOP</span> 
        </Link>
        <Link 
          to={'/cart'}
          className='flex items-center transition-transform transform hover:translate-x-2 group'
        >
          <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={29} />
          <span className='hidden nav-item-name mt-[3rem] group-hover:block'>CART</span> 
          <div className='absolute top-9 left-4'>
            {
              cartItems.length > 0 && (
                <span>
                   <span className='px-2 py-0.5 text-sm text-white bg-pink-600 rounded-full'>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                   </span>
                </span>
              )
            }
          </div>
        </Link>
        <Link 
          to={'/favorite'}
          className='flex items-center transition-transform transform hover:translate-x-2 group'
        >
          <FaHeart className='mr-2 mt-[3rem]' size={26} />
          <span className='hidden nav-item-name mt-[3rem] group-hover:block'>FAVORITE</span> 
          <FavoriteCount/>
        </Link>
      </div>
      <div className='relative'>
         <button 
          onClick={toggleDropdown} 
          className='flex items-center  text-gray-800 focus: outline-none'>
              {userInfo ? <span className='text-white text-sm'>{userInfo.username}</span> : (<></>)}
              {userInfo && (
               <svg
               xmlns="http://www.w3.org/2000/svg"
               className={`h-4 w-4 ml-1 ${
                 dropdownOpen ? "transform rotate-180" : ""
               }`}
               fill="none"
               viewBox="0 0 24 24"
               stroke="white"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
               />
             </svg>
              )}
         </button>
         {
          dropdownOpen && userInfo && (
              <ul 
                 className={`absolute right-0 mt-2 mr-16 space-y-2 bg-white text-gray-600
                ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}
              >
                 {
                  userInfo.isAdmin ? (
                    <ul>
                     <li>
                        <Link 
                          to={'/admin/dashboard'}
                          className='block px-4 py-2 hover:bg-gray-100'
                        >
                           Dashboard
                        </Link>
                     </li>
                     <li>
                        <Link 
                          to={'/admin/upload-product'}
                          className='block px-4 py-2 hover:bg-gray-100'
                        >
                           Products
                        </Link>
                     </li>
                     <li>
                        <Link 
                          to={'/admin/category-list'}
                          className='block px-4 py-2 hover:bg-gray-100'
                        >
                           Category
                        </Link>
                     </li>
                     <li>
                        <Link 
                          to={'/admin/order-list'}
                          className='block px-4 py-2 hover:bg-gray-100'
                        >
                           Orders
                        </Link>
                     </li>
                     <li>
                        <Link 
                          to={'/admin/users'}
                          className='block px-4 py-2 hover:bg-gray-100'
                        >
                            Users
                        </Link>
                     </li>
                     <li>
                        <Link 
                          to={'/admin/profile'}
                          className='block px-4 py-2 hover:bg-gray-100'
                        >
                            Profile
                        </Link>
                     </li>
                     <li>
                        <button
                          onClick={logoutHandler}
                          className='block px-4 py-2 hover:bg-gray-100'
                        >
                            Logout
                        </button>
                     </li>
                    </ul>
                  )
                  :
                  (
                    <>
                     <li>
                        <Link 
                          to={'/profile'}
                          className='block px-4 py-2 hover:bg-gray-100'
                        >
                            Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logoutHandler}
                          className='block px-4 py-2 hover:bg-gray-100'
                        >
                            Logout
                        </button>
                      </li>
                    </>
               
                  )
                 }
              </ul>
          )
         }
       
      </div>
   
       {!userInfo && (
        <ul>
          <li>
            <Link
              to="/signin"
              className="flex items-center mt-5 transition-transform transform hover:translate-x-2 group"
            >
              <AiOutlineLogin className="mr-2" size={26} />
              <span className="hidden nav-item-name group-hover:block">Sign In</span>
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="flex items-center mt-5 transition-transform transform hover:translate-x-2 group"
            >
              <AiOutlineUserAdd className="mr-2" size={26} />
              <span className="hidden nav-item-name group-hover:block">Sign Up</span>
            </Link>
          </li>
        </ul>
      )}
      
    </div>
  );
}

export default Navigation;