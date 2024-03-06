import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query(body) {
        return {
          url: "/register",
          method: "POST",
          body: body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: "/login",
          method: "POST",
          body: body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logout: builder.query({
      query: () => "/logout",
      extraOptions: { credentials: "include" },
    }),
    /* logout: builder.query({
      query() {
        return {
          url: "/logout",
          method: "GET",
        };
      },
    }), */
  }),
});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } =
  authApi;
