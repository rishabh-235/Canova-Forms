import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_USER_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `/${id}`,
    }),
    getCurrentUser: builder.query({
      query: () => "/me",
    }),
    signupUser: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
    }),
    signinUser: builder.mutation({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
    }),
    signoutUser: builder.mutation({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: "/update-profile",
        method: "POST",
        body: user,
      }),
    }),
  }),
});
export const {
  useGetUserQuery,
  useGetCurrentUserQuery,
  useSignupUserMutation,
  useSigninUserMutation,
  useSignoutUserMutation,
  useUpdateUserMutation
} = userApi;



