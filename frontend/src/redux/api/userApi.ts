import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setIsAuthenticated, setLoading, setUser } from "../features/userSlice";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  tagTypes: ["User", "AdminUsers"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query() {
        return { url: "/me", method: "GET" };
      },
      transformResponse: (result) => {
        return result.user;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (err) {
          dispatch(setLoading(false));
          console.error(err);
        }
      },
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query(body) {
        return { url: "/profile/update", method: "PUT", body: body };
      },
      invalidatesTags: ["User"],
    }),
    uploadAvatar: builder.mutation({
      query(body) {
        return { url: "/me/upload_avatar", method: "PUT", body: body };
      },
      invalidatesTags: ["User"],
    }),
    updatePassword: builder.mutation({
      query(body) {
        return { url: "/password/update", method: "PUT", body: body };
      },
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: "/password/forgot",
          method: "POST",
          body: body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `/password/reset/${token}`,
          method: "PUT",
          body: body,
        };
      },
    }),

    /* ADMIN */
    getAdminUsers: builder.query({
      query() {
        return {
          url: "/admin/users",
          method: "GET",
        };
      },
      providesTags: ["AdminUsers"],
    }),
    getUserById: builder.query({
      query(id) {
        return {
          url: `/admin/users/${id}`,
          method: "get",
        };
      },
    }),
    updateUser: builder.mutation({
      query({ id, body }) {
        return {
          url: `/admin/users/${id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["AdminUsers"],
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `/admin/users/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AdminUsers"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserByIdQuery,
  useGetAdminUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
