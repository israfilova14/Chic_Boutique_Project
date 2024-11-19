import SummaryApi from '../../common';
import {apiSlice} from './apiSlice';
export const productApiSlice = apiSlice.injectEndpoints(
  {
    endpoints: (builder) => (
      {
        getProducts: builder.query({
          query: ({keyword}) => (
            {
              url: SummaryApi.getProducts.url,
              params: {keyword}
            }
          ),
          keepUnusedDataFor: 5,
          providesTags: ["Product"]
        }),

        getProductById: builder.query(
          {
            query: (productId) => `${SummaryApi.getProductById.url}/${productId}`,
            providesTags: (result, error, productId) => [
              {type: "Product", id: productId}
            ]
          }
        ),

        allProducts: builder.query(
          {
            query: () => ({
              url: SummaryApi.allProducts.url,
              method: SummaryApi.allProducts.method
            }),
            providesTags: ['Products']
          }
        ),

        getProductDetails: builder.query(
          {
            query: (productId) => ({
              url: `${SummaryApi.getProductById.url}/${productId}`
            }),
            keepUnusedDataFor: 5,
          }
        ),

        uploadProduct: builder.mutation(
          {
            query: (productData) => ({
               url: SummaryApi.uploadProduct.url,
               method: SummaryApi.uploadProduct.method,
               body: productData
            }),
            invalidatesTags: ['Product']
          }
        ),
        
        updateProduct: builder.mutation(
          {
            query: ({productId, formData}) => ({
               url: `${SummaryApi.updateProduct.url}/${productId}`,
               method: SummaryApi.updateProduct.method,
               body: formData
            })
          }
        ),

        deleteProduct: builder.mutation(
          {
             query: (productId) => (
              {
                url: `${SummaryApi.deleteProduct.url}/${productId}`,
                method: SummaryApi.deleteProduct.method,
              }
             ),
             providesTags: ['Product']
          }
        ),

        createReview: builder.mutation(
          {
           query: (data) => ({
             url: `${SummaryApi.productReview.url}/${data.productId}`,
             method: SummaryApi.productReview.method,
             body: data
           })
          }
       ),

       getTopProduct: builder.query(
        {
          query: () => ({
             url: SummaryApi.topProducts.url,
             method: SummaryApi.topProducts.method,
          }),
          keepUnusedDataFor: 5
        }
       ),

       getNewProducts: builder.query(
        {
           query: () => `${SummaryApi.newProduct.url}`,
           keepUnusedDataFor: 5
        }
       ),

       getFilteredProducts: builder.query({
          query: ({checked, radio}) => ({
             url: SummaryApi.filterProducts.url,
             method: SummaryApi.filterProducts.method,
             body: {checked, radio}
          })
       })
      }
    )
  }
)

export const {
   useGetProductByIdQuery,
   useGetProductsQuery,
   useGetProductDetailsQuery,
   useAllProductsQuery,
   useUpdateProductMutation,
   useDeleteProductMutation,
   useCreateReviewMutation,
   useGetTopProductQuery,
   useGetNewProductsQuery,
   useUploadProductMutation,
   useGetFilteredProductsQuery
} = productApiSlice