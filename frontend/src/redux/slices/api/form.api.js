import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_FORM_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getForm: builder.query({
      query: (id) => `/get-form/${id}`,
    }),
    getRecentWorks: builder.query({
      query: () => "get-recent-works",
    }),
    getSharedWorks: builder.query({
      query: () => "get-shared-works",
    }),
    createProject: builder.mutation({
      query: (newProject) => ({
        url: "create-project",
        method: "POST",
        body: newProject,
      }),
    }),
    saveForm: builder.mutation({
      query: (formData) => ({
        url: "save-form",
        method: "POST",
        body: formData,
      }),
    }),
    publishForm: builder.mutation({
      query: (formData) => ({
        url: "publish-form",
        method: "POST",
        body: formData,
      }),
    }),
    getProjects: builder.query({
      query: () => "get-projects",
    }),
    getForms: builder.query({
      query: (projectid) => `get-forms/${projectid}`,
    }),
    getResponseForm: builder.query({
      query: (responseFormId) => `get-response-form/${responseFormId}`,
    }),
  }),
});
export const {
  useGetFormQuery,
  useGetRecentWorksQuery,
  useGetSharedWorksQuery,
  useCreateProjectMutation,
  useSaveFormMutation,
  usePublishFormMutation,
  useGetProjectsQuery,
  useGetFormsQuery,
  useGetResponseFormQuery,
} = formApi;



