import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../config";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (login) => ({
                url: "/login",
                method: "POST",
                body: login,
            })
        }),

        signUpUser: builder.mutation({
            query: (signup) => ({
                url: "/register",
                method: "POST",
                body: signup
            })
        }),

        getProducts: builder.query({
            query: () => ({
                url: '/products',
                headers: {
                    authorization: JSON.stringify(localStorage.getItem('token'))
                },
            }),
            providesTags: ["Products"]
        }),

        getProduct: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                providesTag: ["Products"]
            })
        }),

        addProduct: builder.mutation({
            query: (addproduct) => ({
                url: '/add-product',
                method: "POST",
                body: addproduct
            }),
            invalidatesTags: ['Products'],
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Products"]
        }),

        updateProduct: builder.mutation({
            query: ({ id, ...patch }) => ({
              url: `/product/${id}`,
              method: "PUT",
              body: patch,
            }),
            invalidatesTags: ['Products'],
        }),
    })
})

export const { 
    useLoginUserMutation, 
    useSignUpUserMutation, 
    useAddProductMutation,
    useGetProductsQuery,
    useGetProductQuery,
    useDeleteProductMutation,
    useUpdateProductMutation
 } = api;