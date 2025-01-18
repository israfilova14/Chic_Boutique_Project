import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../../redux/api/usersApiSlice';
import { setCredentials } from '../../../../redux/features/auth/authSlice';
import {toast} from 'react-toastify';
import Loader from '../../../helpers/loader/index.js';
import loginBackground from '../../../../images/auth.avif';

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [login, {isLoading}] = useLoginMutation();
  const {userInfo} = useSelector(state => state.auth);
  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if(userInfo){
       navigate(redirect)
    }
  },[navigate, redirect, userInfo]);

  const submitHandler = async(e) => {
      e.preventDefault();
      try{
        const response = await login({email, password}).unwrap();
        console.log(response);
        toast.success("Sign in successfully !")
        dispatch(setCredentials({...response}));
      }catch(err){
        toast.error(err?.data?.message || err?.message)
      }
  }

  return (
    <div>
       <section className='pl-[10rem] flex flex-wrap'>
           <div className='mr-[4rem] mt-[5rem]'>
               <h1 className='text-2xl font-semibold mb-4'>
                  Sign In
               </h1>
               <form className='container w-[40rem]' onSubmit={submitHandler}>
                  <div className='my-[2rem]'>
                     <label htmlFor='email' className='block text-sm font-medium'>
                         Email Address
                     </label>
                     <input
                        required
                        type='email'
                        id='email'
                        placeholder='Enter your email...'
                        className='mt-1 p-2 border rounded outline-none w-full bg-[#4a4a4a] text-white'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                  </div>
                  <div className='my-[2rem]'>
                     <label htmlFor='password' className='block text-sm font-medium'>
                         Password
                     </label>
                     <input
                        required
                        type='password'
                        id='password'
                        placeholder='Enter your password...'
                        className='mt-1 p-2 border rounded outline-none w-full bg-[#4a4a4a] text-white'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                     />
                  </div>
                  <button
                        disabled={isLoading}
                        type='submit' 
                        className='bg-[#1DB954] hover:bg-[#17A34A] text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
                  >
                      {isLoading ? "Sign In..." : "Sign In"}
                  </button>
                  {isLoading && <Loader/>}
               </form>
               <div className='mt-4'>
                   <p>
                      New Customer?  {"    "}
                      <Link 
                        to={redirect ? `/signup?signup=${redirect}`: '/signup'}
                        className='text-[#1DB954] hover:underline ml-1'
                      >
                          Sign Up
                      </Link>
                   </p>
               </div>
           </div>
           <img 
              src={loginBackground} 
              className='h-[44rem] w-[47%] xl:block md:hidden sm:hidden rounded-lg object-cover'
           />
       </section>
    </div>
  )
}

export default SignIn