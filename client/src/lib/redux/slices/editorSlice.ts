import { createSlice } from '@reduxjs/toolkit'

interface EditorInitalState {
    editor: {
        noteid: string | null,
        open: boolean,
    }
    saved: boolean;
}

const initialState: EditorInitalState = {
    editor: {
        noteid: null,
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
            state.editor = { noteid: action.payload, open: true }
        },
        closeEditor: (state) => {
            state.editor = { noteid: null, open: false }
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