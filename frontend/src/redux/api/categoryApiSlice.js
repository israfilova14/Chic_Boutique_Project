import { apiSlice } from "./apiSlice";
import SummaryApi from "../../common";

export const categoryApiSlice  = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
       
      createCategory: builder.mutation({
         query: (newCategory) => ({
           url: SummaryApi.createCategory.url,
           method: SummaryApi.createCategory.method,
           body: newCategory
         })
      }),

      updateCategory: builder.mutation({
          query: ({categoryId, name}) => ({
             url: `${SummaryApi.updateCategory.url}/${categoryId}`,
             method: SummaryApi.updateCategory.method,
             body: {name}
          })
      }),

      deleteCategory: builder.mutation({
         query: (categoryId) => ({
            url: `${SummaryApi.deleteCategory.url}/${categoryId}`,
            method: SummaryApi.deleteCategory.method
         })
      }),

      allCategories: builder.query({
          query: () => ({
             url: SummaryApi.allCategories.url,
             method: SummaryApi.allCategories.method   
          })
      }),

      currentCategory: builder.mutation({
         query: () => ({
            url: SummaryApi.currentCategory.url,
            method: SummaryApi.currentCategory.method
         })
      })
    })
})

export const 
{
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAllCategoriesQuery,
  useCurrentCategoryMutation
} = categoryApiSlice