import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const problemStatusApi = createApi({
  reducerPath: "problemStatusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/codetest/",
  }),
  endpoints: (builder) => ({
    getProblemStatus: builder.query({
      query: (id) => `status/${id}`,
    }),
  }),
});

export const { useGetProblemStatusQuery } = problemStatusApi