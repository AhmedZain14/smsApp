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

export const moneySafeDeposit = createAsyncThunk(

    "moneySafe/moneySafeDeposit",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/FinancialAccounts`, {
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

export const moneySafePostCount = createAsyncThunk(

    "moneySafe/moneySafePostCount",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/financialBalance`, {
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

export const moneySafeDelete = createAsyncThunk(

    "moneySafe/moneySafeDelete",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/FinancialAccounts/${action}`, {
                method: 'DELETE', 
                body: JSON.stringify(action),
              });
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

export const financialReceiptPost = createAsyncThunk(

    "moneySafe/financialReceiptPost",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/FinancialReceipts`, {
                method: 'POST',
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

export const FetchFinancialReceipt = createAsyncThunk(

    "moneySafe/FetchFinancialReceipt",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/FinancialReceipts`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

export const DeleteFinancialReceipt = createAsyncThunk(

    "moneySafe/DeleteFinancialReceipt",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/FinancialReceipts/${action}`, {
                method: 'DELETE', 
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
    financialReceipt: [],
    error: null,
    loading: true,
};

export const moneySafeSlice = createSlice({
    name:'moneySafe',
    initialState,
    reducers: {
    },
    extraReducers: {
        [moneySafeDeposit.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [moneySafeDeposit.pending]: (state, action) => {
            state.loading = true;
        },
        [moneySafeDeposit.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [moneySafeDelete.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [moneySafeDelete.pending]: (state, action) => {
            state.loading = true;
        },
        [moneySafeDelete.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [financialReceiptPost.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [financialReceiptPost.pending]: (state, action) => {
            state.loading = true;
        },
        [financialReceiptPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [FetchFinancialReceipt.fulfilled]: (state, action) => {
            state.loading = false;
            state.financialReceipt = [...action.payload];
        },
        [FetchFinancialReceipt.pending]: (state, action) => {
            state.loading = true;
        },
        [FetchFinancialReceipt.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [DeleteFinancialReceipt.fulfilled]: (state, action) => {
            state.loading = false;
            state.financialReceipt = [...action.payload];
        },
        [DeleteFinancialReceipt.pending]: (state, action) => {
            state.loading = true;
        },
        [DeleteFinancialReceipt.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { } = moneySafeSlice.actions;
export default moneySafeSlice.reducer;