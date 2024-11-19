import {apiSlice} from './apiSlice';
import SummaryApi from '../../common';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (data) => ({
         url: SummaryApi.signIn.url,
         method: SummaryApi.signIn.method,
         body: data
      })
    }),

    logout: builder.mutation({
       query: () => ({
          url: SummaryApi.logout.url,
          method: SummaryApi.logout.method
       })
    }),

    signup: builder.mutation({
       query: data => ({
         url: SummaryApi.signUp.url,
         method: SummaryApi.signUp.method,
         body: data
       })
    }),

    updateProfile: builder.mutation({
       query: data => ({
          url: SummaryApi.userUpdateProfile.url,
          method: SummaryApi.userUpdateProfile.method,
          body: data
       })
    }),

    getUsers: builder.query({
      query: () => ({
         url: SummaryApi.allUsers.url,
         method: SummaryApi.allUsers.method
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5
    }),

    deleteUser: builder.mutation({
      query: userId => ({
         url: `${SummaryApi.deleteUser.url}/${userId}`,
         method: SummaryApi.deleteUser.method
      }),
      invalidatesTags: ['User']
    }),

    getUserDetails: builder.query({
      query: (userId) => ({
          url: `${SummaryApi.userDetails.url}/${userId}`
      }),
        keepUnusedDataFor: 5
    }),

    updateUser: builder.mutation({
      query: data => ({
         url: `${SummaryApi.updateUser.url}/${data.userId}`,
         method: SummaryApi.updateUser.method,
         body: data
      }),
      invalidatesTags: ['User']
    })
  })
})

export const 
{
   useLoginMutation,
   useLogoutMutation, 
   useSignupMutation,  
   useUpdateProfileMutation,
   useGetUsersQuery,
   useDeleteUserMutation,
   useGetUserDetailsQuery,
   useUpdateUserMutation
} = userApiSlice