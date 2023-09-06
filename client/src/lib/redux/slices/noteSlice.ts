import { createSlice } from '@reduxjs/toolkit'

export interface Note {
    noteid: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    category: string[];
    body: any
}

interface InitalState {
    data: Record<string, Note>,
    meta: object;
    page: number;
    error: boolean;
    loading: boolean;
}

const initialState: InitalState = {
    data: {},
    meta: {},
    page: 1,
    loading: true,
    error: false
}

const noteSlice = createSlice({
    initialState,
    name: "noteslice",
    reducers: {
        addNote: (state, action) => {
            state.data = { ...state.data, [action.payload?.noteid]: action.payload }
        },
        updateMeta: (state, action) => {
            state.meta = action.payload;
        },
        updatePage: (state, action) => {
            state.page = action.payload;
        },
        updateNoteTitle: (state, action) => {
            const newstate = state.data;
            newstate[action?.payload?.noteid].title = action.payload?.title;
            state.data = newstate;
        },
        updateNoteBody: (state, action) => {
            const newstate = state.data;
            newstate[action?.payload?.noteid].body = action.payload?.body;
            state.data = newstate;
        },
        updateNoteCategory: (state, action) => {
            const newstate = state.data;
            newstate[action?.payload?.noteid].category = action.payload?.category;
            state.data = newstate;
        },
        updateNote: (state, action) => {
            state.data = { ...state.data, [action.payload?.noteid]: action.payload }
        },
        deleteNote: (state, action) => {
            const { [action.payload.noteid]: _, ...datatosave } = state.data;
            state.data = datatosave;
        },
        addNoteAll: (state, action) => {
            state.data = action.payload;
        },
        addNodeAllAttach: (state, action) => {
            state.data = { ...state.data, ...action.payload }
        },
        setNoteLoading: (state, action) => {
            state.loading = typeof action.payload == 'boolean' ? action.payload : state.loading;
        }
    }
})

export const { addNote, updateMeta, updatePage, addNoteAll, deleteNote, updateNote, updateNoteBody, updateNoteTitle, addNodeAllAttach, setNoteLoading, updateNoteCategory } = noteSlice.actions
export default noteSlice.reducer