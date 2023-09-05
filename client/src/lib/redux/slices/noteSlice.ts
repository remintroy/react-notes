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
    data: Note[],
    error: boolean;
    loading: boolean;
}

const initialState: InitalState = {
    data: [{
        title: "Hey you know what... ",
        noteid: "somerandomid",
        body: {},
        category: ["categoryone", "categoryone", "categoryone", "categoryone"],
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    }, {
        title: "At the end of the day its night! ",
        noteid: "somerandomid2",
        body: {},
        category: ["categoryone", "categoryone", "categoryone", "categoryone"],
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
    }],
    loading: false,
    error: false
}

const noteSlice = createSlice({
    initialState,
    name: "noteslice",
    reducers: {
        addNote: (state, action) => {
            state.data = [...state.data, action.payload];
        },
        updateNode: (state, action) => {
            const updatedState = state.data;
            const indexToUpdate = updatedState.map(d => d.noteid == action.payload.noteid).indexOf(true);
            if (indexToUpdate != -1) updatedState[indexToUpdate] = action.payload;
            state.data = updatedState;
        },
        deleteNote: (state, action) => {
            const updatedState = state.data;
            const indexToDelete = updatedState.map(d => d.noteid == action.payload.noteid).indexOf(true);
            updatedState.splice(indexToDelete, 1);
            state.data = updatedState;
        },
        addNoteAll: (state, action) => {
            state.data = action.payload;
        }
    }
})

export const { addNote, addNoteAll, deleteNote, updateNode } = noteSlice.actions
export default noteSlice.reducer