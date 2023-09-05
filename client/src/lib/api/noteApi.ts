import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3001/api/v1/",
});

const noteApiSlice = createApi({
    reducerPath: "noteapi",
    baseQuery: baseQuery,
    tagTypes: ["notes"],
    endpoints: builder => ({
        createNote: builder.mutation({
            query: () => ({
                url: '/',
                method: "POST"
            })
        }),
        getNote: builder.query({
            query: ({ noteid }) => `/${noteid}`
        }),
        updateNote: builder.mutation({
            query: ({ note }) => ({
                url: `/`,
                method: "PUT",
                body: note
            })
        }),
        getNotes: builder.query({
            query: ({ page }) => `/?page=${Number(page) || 1}`,
            providesTags: ["notes"]
        }),
        deleteNote: builder.mutation({
            query: ({ noteid }) => ({
                url: '/',
                method: "DELETE",
                body: { noteid }
            }),
            invalidatesTags: ["notes"]
        })
    })
});

export const noteApiEndpoints = noteApiSlice.endpoints;
export const noteApiReducer = noteApiSlice.reducer;
export const noteApiReducerPath = noteApiSlice.reducerPath;
export const noteApiMiddleware = noteApiSlice.middleware;

export const { useCreateNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation, useGetNoteQuery, useGetNotesQuery } = noteApiSlice;