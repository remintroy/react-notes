import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "./slices/noteSlice";
import { noteApiMiddleware, noteApiReducer, noteApiReducerPath } from "../api/noteApi";
import editorSlice from "./slices/editorSlice";

const store = configureStore({
    reducer: {
        note: noteSlice,
        editor: editorSlice,
        [noteApiReducerPath]: noteApiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(noteApiMiddleware),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;