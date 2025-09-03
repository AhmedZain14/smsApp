import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate   } from "react-router-dom";



const initialState = {
    alert: {message: null, display: false}, 
    error: null,
    loading: true,
};

export const alertSlice = createSlice({
    name:'alerts',
    initialState,
    reducers: {
        makeAlert: (state, action) => {
            state.alert.message = action.payload.message;
            state.alert.display = action.payload.display;
        }
    }
});

export const { makeAlert } = alertSlice.actions;
export default alertSlice.reducer;