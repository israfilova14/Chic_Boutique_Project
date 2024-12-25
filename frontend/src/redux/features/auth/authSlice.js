import { createSlice } from "@reduxjs/toolkit"

// Utility function to check if the token has expired
const getExpirationTime = () => {
  const expirationTime = localStorage.getItem('expirationTime')
  return expirationTime ? Number(expirationTime) : null
}

const initialState = {
  userInfo: localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null,
  isAuthenticated: false,   
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Save user info and expiration time to localStorage
    setCredentials: (state, action) => {
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000
      state.userInfo = action.payload
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
      localStorage.setItem('expirationTime', expirationTime)
      state.isAuthenticated = true
    },
    
    // Handle logout: clear user data and expiration time
    logout: (state) => {
      state.userInfo = null
      state.isAuthenticated = false
      localStorage.clear()
    },
    
    // Check if the user token is expired
    checkExpiration: (state) => {
      const expirationTime = getExpirationTime();
      if (expirationTime && new Date().getTime() > expirationTime) {
        state.userInfo = null
        state.isAuthenticated = false
        localStorage.clear()
      }
    },
  },
})

export const { setCredentials, logout, checkExpiration } = authSlice.actions

export default authSlice.reducer
 