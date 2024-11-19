import { createSlice } from "@reduxjs/toolkit";

// Utility function to check if the token has expired
const getExpirationTime = () => {
  const expirationTime = localStorage.getItem('expirationTime');
  return expirationTime ? Number(expirationTime) : null;
};

const initialState = {
  userInfo: localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null,
  isAuthenticated: false,  // Add authentication flag
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Save user info and expiration time to localStorage
    setCredentials: (state, action) => {
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      state.userInfo = action.payload; // Save user info from action
      localStorage.setItem("userInfo", JSON.stringify(action.payload));  // Store user info
      localStorage.setItem('expirationTime', expirationTime);  // Store expiration time
      state.isAuthenticated = true; // Mark as authenticated
    },
    
    // Handle logout: clear user data and expiration time
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.clear();  // Clear all data from localStorage
    },
    
    // Check if the user token is expired
    checkExpiration: (state) => {
      const expirationTime = getExpirationTime();
      if (expirationTime && new Date().getTime() > expirationTime) {
        state.userInfo = null;
        state.isAuthenticated = false;
        localStorage.clear();  // Clear expired data from localStorage
      }
    },
  },
});

export const { setCredentials, logout, checkExpiration } = authSlice.actions;

export default authSlice.reducer;
 