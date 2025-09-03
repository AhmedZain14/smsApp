import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate   } from "react-router-dom";


export const fetchNotes = createAsyncThunk(

    "notes/fetchNotes",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/adminNotes`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

export const deleteNote = createAsyncThunk(

    "notes/deleteNotes",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/adminNotes/${action}`, {
                method: 'DELETE'
              });
            const data = await res.json();
            return data;
        } catch (error){
            console.log(error.message);
            return rejectWithValue(error.message);
        }
    }

);


// const userAccount = JSON.parse(localStorage.getItem('user'));

const initialState = {
    notes: [], 
    error: null,
    loading: true,
    idOfNoteSelected: {
        disappear: true,
        idNote: null
    },
};

export const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers: {
        NoteSelected: (state, action) => {
            console.log(" Reducer Action", action.payload);
            state.idOfNoteSelected = action.payload;
        }
    },
    extraReducers: {
        [fetchNotes.fulfilled]: (state, action) => {
            state.loading = false;
            state.notes.push(action.payload);
        },
        [fetchNotes.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchNotes.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteNote.fulfilled]: (state, action) => {
            state.loading = false;
            state.notes.push(action.payload);
        },
        [deleteNote.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteNote.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { NoteSelected } = notesSlice.actions;
export default notesSlice.reducer;