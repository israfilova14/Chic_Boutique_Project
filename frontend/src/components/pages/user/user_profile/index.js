import React from 'react';
import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import Loader from '../../../helpers/loader/index.js';
import { setCredentials } from '../../../../redux/features/auth/authSlice';
import { Link } from 'react-router-dom';
import {useUpdateProfileMutation}  from '../../../../redux/api/usersApiSlice'; 
 
const Profile = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {userInfo} = useSelector(state => state.auth);
  const [updateProfile, {isLoading: loadingUpdateProfile}] = useUpdateProfileMutation();

  useEffect(() => {
     setUsername(userInfo.username);
     setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const updateData = {
      _id: userInfo._id,
      username,
      email,
      password: password || undefined,   
    };

    try {
      const res = await updateProfile(updateData).unwrap();   
      dispatch(setCredentials(res));   
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Something went wrong');
    }
  };
  
  return (
    <div className='container mx-auto p-4 mt-[7rem]'>
        <div className='flex justify-center align-center md:flex md:space-x-4'>
           <div className='md:w-1/3'>
           <h2 className='text-2xl font-semibold mb-4'>Update <span className='text-[#1DB954]'>Profile.</span></h2>
             <form onSubmit={submitHandler}>
                <div className='mb-4'>
                    <label className='block mb-2'>Name</label>
                    <input
                     type='text' 
                     placeholder='Enter your name...' 
                     className='form-input p-2 rounded-sm w-full bg-[#f5f5f5]'
                     value={username}
                     onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2 text-sm'>Email</label>
                    <input
                     type='text' 
                     placeholder='Enter your email...' 
                     className='form-input p-2 rounded-sm w-full bg-[#f5f5f5]'
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2 text-sm'>Password</label>
                    <input
                     type='password' 
                     placeholder='Enter your password...' 
                     className='form-input p-2 rounded-sm w-full bg-[#f5f5f5]'
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2'>Confirm password</label>
                    <input
                     type='password' 
                     placeholder='Confirm Password...' 
                     className='form-input p-2 rounded-sm w-full bg-[#f5f5f5]'
                     value={confirmPassword}
                     onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className='flex justify-between'>
                    <button 
                      type='submit' 
                      className='bg-[#1DB954] text-white py-2 px-4 rounded hover:bg-[#1C741C]'
                    >
                        Update
                    </button>
                    <Link 
                      to={'/user-orders'} 
                      className='bg-[#d51f69] text-white py-2 px-4 rounded hover:bg-[#c43464]'
                    >
                      My Orders
                    </Link>
                </div>
             </form>
           </div>
           {loadingUpdateProfile && <Loader/>}
        </div>
    </div>
  )
}

export default Profile