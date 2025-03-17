import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  keepUnusedDataFor: 30,
  tagTypes: ["Order", "AdminOrders"],
  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query(body) {
        return {
          url: "/orders/new",
          method: "POST",
          body: body,
        };
      },
    }),
    myOrders: builder.query({
      query() {
        return {
          url: "/me/orders",
          method: "GET",
        };
      },
      providesTags: ["Order"],
    }),
    myOrderDetails: builder.query({
      query(id) {
        return {
          url: `/orders/${id}`,
          method: "GET",
        };
      },
      providesTags: ["Order"],
    }),
    stripeCheckoutSession: builder.mutation({
      query(body) {
        return {
          url: "/payment/checkout_session",
          method: "POST",
          body: body,
        };
      },
    }),
    getAdminOrders: builder.query({
      query() {
        return {
          url: "/admin/orders",
          method: "GET",
        };
      },
      providesTags: ["AdminOrders"],
    }),
    updateOrderStatus: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/orders/${id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation({
      query(id) {
        return {
          url: `/admin/orders/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminOrders"],
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
  useMyOrdersQuery,
  useMyOrderDetailsQuery,
  useGetAdminOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
