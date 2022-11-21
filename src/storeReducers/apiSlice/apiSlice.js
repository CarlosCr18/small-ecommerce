import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://small-ecommerce-backend.herokuapp.com/",
  }),
  tagTypes: ["Orders", "Data"],
  endpoints: (builder) => ({
    getList: builder.query({
      query: () => ({ url: "/api/getList", method: "get" }),
      providesTags: ["Data"],
    }),
    getOrders: builder.query({
      query: () => "/api/orders",
      providesTags: ["Orders"],
    }),
    addNewOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/api/create",
        method: "POST",
        body: newOrder,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Data"],
    }),
    getOrderDetail: builder.mutation({
      query: (order_id) => ({
        url: "/api/detail",
        method: "POST",
        body: order_id,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetListQuery, useGetOrdersQuery, useAddNewOrderMutation, useGetOrderDetailQuery } = api;
