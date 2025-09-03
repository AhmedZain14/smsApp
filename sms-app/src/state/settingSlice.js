import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate   } from "react-router-dom";


// export const fetchPosts = createAsyncThunk(

//     "posts/fetchPosts",
//     async(_, thunkAPI) => {
//         const { rejectWithValue } = thunkAPI;
//         try{
//             const res = await fetch(`http://localhost:3006/posts`);
//             const data = await res.json();
//             return data;
//         } catch (error){
//             return rejectWithValue(error.message);
//         }
//     }

// );

export const accountSetting = createAsyncThunk(

    "setting/accountSetting",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/accounts/${action.id}`, {
                method: 'PUT', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(action.value),
              });
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

export const editSystemSetting = createAsyncThunk(

    "setting/editSystemSetting",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/systemSetting/1`, {
                method: 'PUT', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(action),
              });
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

// const userAccount = JSON.parse(localStorage.getItem('user'));

const initialState = {
    error: null,
    loading: true,
};

export const adminMessageSlice = createSlice({
    name:'setting',
    initialState,
    reducers: {
        // NoteSelected: (state, action) => {
        //     console.log(" Reducer Action", action.payload);
        // }
    },
    extraReducers: {
        [accountSetting.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [accountSetting.pending]: (state, action) => {
            state.loading = true;
        },
        [accountSetting.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [editSystemSetting.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [editSystemSetting.pending]: (state, action) => {
            state.loading = true;
        },
        [editSystemSetting.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { } = adminMessageSlice.actions;
export default adminMessageSlice.reducer;