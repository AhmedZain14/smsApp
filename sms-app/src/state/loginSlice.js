import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate   } from "react-router-dom";


export const fetchAccounts = createAsyncThunk(

    "login/fetchAccounts",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/accounts`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }

    }

);

const userAccount = JSON.parse(localStorage.getItem('user'));

const initialState = {
    accounts: [], 
    loginMsg: null, // {value: "post" or "pending" or "err", msg:"test"}
    error: null,
    account: (userAccount ? userAccount: null),
};

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers: {
        logInOut: (state, action) => {
            console.log(" Reducer State", state);
            console.log(" Reducer Action", action.payload);


            let accountFiltered = state.accounts[0].find( (acc) => acc.username === action.payload.username && acc.password === action.payload.password);
            
            if(accountFiltered){

                if(!accountFiltered.ban){
                    state.account = accountFiltered;
                    console.log(accountFiltered);
                    state.loginMsg = {value: "post", msg: "Successful."};
                    let authItem = {...state.account, auth: "true"};
                    localStorage.setItem('user', JSON.stringify(authItem));
                }else{
                    state.loginMsg = {value: "err", msg: "You can not log in. Your account has been banned!"};
                }

            }else{
                state.auth = false;
                state.loginMsg = {value: "err", msg: "Username or password is invalid."};
            }

            // if(accountFiltered){
            //     state.account = accountFiltered;
            //     console.log(accountFiltered);
            //     state.loginMsg = {value: "post", msg: "Successful."};
            //     let authItem = {...state.account, auth: "true"};
            //     localStorage.setItem('user', JSON.stringify(authItem));
            // }else{
            //     state.auth = false;
            //     state.loginMsg = {value: "err", msg: "Username or password is invalid."};
            // }

        }
    },
    extraReducers: {
        [fetchAccounts.fulfilled]: (state, action) => {
            state.loading = false;
            state.accounts.push(action.payload);
        },
        [fetchAccounts.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchAccounts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { logInOut } = loginSlice.actions;
export default loginSlice.reducer;