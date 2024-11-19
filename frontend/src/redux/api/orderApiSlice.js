import {apiSlice} from '../api/apiSlice';
import SummaryApi from '../../common';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
         url: SummaryApi.createOrder.url,
         method: SummaryApi.createOrder.method,
         body: order
      })
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${SummaryApi.findOrder.url}/${id}`
      })
    }),

    payOrder: builder.mutation({
      query: ({orderId, details}) => ({
        url: `${SummaryApi.markOrderAsPaid.method}/${orderId}`,
        method: SummaryApi.markOrderAsPaid.method,
        body: details
      })
    }),

    getPaypalClientId: builder.query({
      query: () => ({
        url: SummaryApi.getPayPalClientId.url
      })
    }),

    getUserOrders: builder.query({
      query: () => ({
        url: SummaryApi.userOrders.url
      }),
      keepUnusedDataFor: 5
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${SummaryApi.markOrderAsDelivered.url}/${orderId}`,
        method: SummaryApi.markOrderAsDelivered.method
      })
    }),

    getOrders: builder.query({
      query: () => ({
        url: SummaryApi.allOrders.url
      })
    }),

    getTotalOrders: builder.query({
      query: () => SummaryApi.countTotalOrders.url
    }),

    getTotalSales: builder.query({
      query: () => SummaryApi.calculateTotalSales.url
    }),

    getTotalSalesByDate: builder.query({
      query: () => SummaryApi.getTotalSalesByDate.url
    })
  })
})

export const {
 usePayOrderMutation,
 useGetTotalOrdersQuery,
 useGetTotalSalesQuery,
 useGetTotalSalesByDateQuery,
 useCreateOrderMutation,
 useGetOrderDetailsQuery,
 useGetPaypalClientIdQuery,
 useGetUserOrdersQuery,
 useDeliverOrderMutation,
 useGetOrdersQuery
} = orderApiSlice