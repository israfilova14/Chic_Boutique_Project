import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const backendDomen = "http://localhost:5050" 

const baseQuery = fetchBaseQuery({
   baseUrl: backendDomen,
   credentials: 'include'
});

export const apiSlice = createApi({
   baseQuery,
   tagTypes: ['Product', 'Order', 'User', 'Category'],
   endpoints: () => ({})
})