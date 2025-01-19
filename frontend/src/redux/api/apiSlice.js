import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const backendDomen = process.env.REACT_APP_BACKEND_URL 

const baseQuery = fetchBaseQuery({
   baseUrl: backendDomen,
   credentials: 'include'
});

export const apiSlice = createApi({
   baseQuery,
   tagTypes: ['Product', 'Order', 'User', 'Category'],
   endpoints: () => ({})
})