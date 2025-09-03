import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate   } from "react-router-dom";


export const fetchPosts = createAsyncThunk(

    "posts/fetchPosts",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/posts`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

export const postPosts = createAsyncThunk(

    "posts/fetchPosts",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/posts`, {
                method: 'POST', // or 'PUT'
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

export const deletePosts = createAsyncThunk(

    "posts/deletePosts",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/posts/${action}`, {
                method: 'DELETE',
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
    posts: [], 
    error: null,
    loading: true,
};

export const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers: {
        NoteSelected: (state, action) => {
            console.log(" Reducer Action", action.payload);
        }
    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.posts.push(action.payload);
        },
        [fetchPosts.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { NoteSelected } = postsSlice.actions;
export default postsSlice.reducer;