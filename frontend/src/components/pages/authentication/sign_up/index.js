// IMPORTS
import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//-----------------------------------------------------------------------
import Loader from '../../../helpers/loader/index.js';
import {setCredentials } from '../../../../redux/features/auth/authSlice';
import {toast} from 'react-toastify';
import {useSignupMutation } from '../../../../redux/api/usersApiSlice';
//-----------------------------------------------------------------------
import signUp from '../../../../images/auth.avif';

const SignUp = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, {isLoading}] = useSignupMutation();
  const {userInfo} = useSelector(state => state.auth);
  
  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  const submitHandler = async (e) => {
    e.preventDefault();
 
    if (password !== confirmPassword) {
     toast.error('Passwords do not match!');
    } 
    else 
    {
        try {
          const response = await register({ username, email, password }).unwrap();
    
          // Check the response from the server (for example, let's assume that the token was received)
          const { token, ...userData } = response;  
    
          // Adding the token to localStorage or Redux
          localStorage.setItem('token', token);  // Or store the token in the Redux store
          dispatch(setCredentials({ ...userData, token }));
    
          // Registration successful, redirect user
          navigate(redirect);
          toast.success('User registered successfully!');
          } 
          catch (error) 
          {
          console.log(error);
          toast.error(error?.data?.message || 'Registration failed');
        }
    }
   };
  
  useEffect(
    () => {
      if(userInfo){
          navigate(redirect);
      }
    }, [navigate, redirect, userInfo]
  )

  return (
    <section className='pl-[10rem] flex flex-wrap'>
        <div className='mr-[4rem] mt-[5rem]'>
            <h1 className='text-2xl font-semibold mb-4 '>Sign Up</h1>
            <form 
              onSubmit={submitHandler}
              className='container w-[40rem]'
            >
                <div className='my-[2rem]'>
                    <label 
                       htmlFor='name' 
                       className='block text-sm font-medium'
                    >
                      Username
                    </label>
                    <input
                       required
                       type='text'
                       id='name'
                       className='mt-1 p-2 border rounded w-full bg-[#f5f5f5]'
                       placeholder='Enter your name...'
                       value={username}
                       onChange={e => setUserName(e.target.value)}
                    />
                </div>
                <div className='my-[2rem]'>
                    <label 
                       htmlFor='email' 
                       className='block text-sm font-medium'
                    >
                      Email Address
                    </label>
                    <input
                       required
                       type='email'
                       id='email'
                       className='mt-1 p-2 border rounded w-full bg-[#f5f5f5]'
                       placeholder='Enter your email...'
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='my-[2rem]'>
                    <label 
                       htmlFor='password' 
                       className='block text-sm font-medium'
                    >
                       Password
                    </label>
                    <input
                       required
                       type='password'
                       id='password'
                       className='mt-1 p-2 border rounded w-full bg-[#f5f5f5]'
                       placeholder='Enter your name...'
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='my-[2rem]'>
                    <label 
                       htmlFor='confirmPassword' 
                       className='block text-sm font-medium'
                    >
                      Confirm Password
                    </label>
                    <input
                       required
                       type='password'
                       id='confirmPassword'
                       className='mt-1 p-2 border rounded w-full bg-[#f5f5f5]'
                       placeholder='Confirm Password...'
                       value={confirmPassword}
                       onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button 
                  disabled={isLoading}
                  type='submit'
                  className='bg-[#1DB954] hover:bg-[#17A34A] text-white px-4 py-2 rounded cursor-pointer my-[1rem]'
                >
                  {isLoading ? "Registering..." : "Sign Up"}
                </button>
                {
                  isLoading && <Loader/>
                }
            </form>
            <div className='mt-4'>
                   <p>
                      Already have an account?  {"    "}
                      <Link 
                        to={redirect ? `/signin?signin=${redirect}`: '/signin'}
                        className='text-[#1DB954] hover:underline ml-1'
                      >
                          Sign In
                      </Link>
                   </p>
            </div>
        </div>
        <img 
            src={signUp} 
            className='h-[44rem] w-[47%] xl:block md:hidden sm:hidden rounded-lg object-cover'
        />
    </section>
  )
}

export default SignUp