import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/note/",
});

const noteApiSlice = createApi({
    reducerPath: "noteapi",
    baseQuery: baseQuery,
    endpoints: builder => ({
        // my api's
    })
});

export const noteApiEndpoints = noteApiSlice.endpoints;
export const noteApiReducer = noteApiSlice.reducer;
export const noteApiReducerPath = noteApiSlice.reducerPath;
export const noteApiMiddleware = noteApiSlice.middleware;

export const { } = noteApiSlice;