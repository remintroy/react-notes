import { createSlice } from '@reduxjs/toolkit'
import { Note } from "./noteSlice"

interface EditorInitalState {
    editor: {
        data: Note | null,
        open: boolean,
    }
    saved: boolean;
}

const initialState: EditorInitalState = {
    editor: {
        data: null,
        open: false,
    },
    saved: false
}

const editorSlice = createSlice({
    initialState,
    name: "editorslice",
    reducers: {
        setEditor: (state, action) => {
            state.editor = action.payload;
        },
        openEditor: (state, action) => {
            state.editor = { data: action.payload, open: true }
        },
        closeEditor: (state) => {
            state.editor = { data: null, open: false }
        },
        setEditorSaved: (state, action) => {
            state.saved = action.payload;
        }
    }
});

export default editorSlice.reducer;
export const {
    setEditor,
    setEditorSaved,
    closeEditor,
    openEditor
} = editorSlice.actions;