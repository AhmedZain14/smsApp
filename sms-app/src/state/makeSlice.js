import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate   } from "react-router-dom";

export const createAccount = createAsyncThunk(

    "create/createAccount",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/accounts`, {
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

export const deleteAccount = createAsyncThunk(

    "create/deleteAccount",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/accounts/${action}`, {
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

export const createWorker = createAsyncThunk(

    "create/createWorker",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/workers`, {
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

export const deleteWorker = createAsyncThunk(

    "create/deleteWorker",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/workers/${action}`, {
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

export const createClass = createAsyncThunk(

    "create/createClass",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/classes`, {
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

export const createActiveTeacher = createAsyncThunk(

    "create/createActiveTeacher",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/teachers`, {
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

export const EditActiveTeacher = createAsyncThunk(

    "create/EditActiveTeacher",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/teachers/${action.id}`, {
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

export const deleteActiveTeacher = createAsyncThunk(

    "create/deleteActiveTeacher",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/teachers/${action}`, {
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

export const deleteClass = createAsyncThunk(

    "create/deleteClass",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/classes/${action}`, {
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

export const createNote = createAsyncThunk(

    "create/createNote",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/adminNotes`, {
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

export const createReport = createAsyncThunk(

    "create/createReport",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/reports`, {
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

export const deleteReport = createAsyncThunk(

    "create/deleteReport",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/reports/${action}`, {
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

export const createExam = createAsyncThunk(

    "create/createExam",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/exams`, {
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

export const createPrivateNote = createAsyncThunk(

    "create/createPrivateNote",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/privateNotes`, {
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


export const deletePrivateNote = createAsyncThunk(

    "create/deletePrivateNote",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/privateNotes/${action}`, {
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

// export const RoomSendMessage = createAsyncThunk(

//     "create/RoomSendMessage",
//     async(action, thunkAPI) => {
//         const { rejectWithValue } = thunkAPI;
//         try{
//             const res = await fetch(`http://localhost:3006/classes/${action.id}`, {
//                 method: 'PUT', // or 'PUT'
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(action),
//               });
//             const data = await res.json();
//             return data;
//         } catch (error){
//             return rejectWithValue(error.message);
//         }
//     }

// );

const initialState = {
    error: null,
    loading: true,
};

export const makeSlice = createSlice({
    name:'create',
    initialState,
    reducers: {
        // makeAlert: (state, action) => {
        //     state.alert.message = action.payload.message;
        //     state.alert.display = action.payload.display;
        // }
    },
    extraReducers: {
        [createWorker.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [createWorker.pending]: (state, action) => {
            state.loading = true;
        },
        [createWorker.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteWorker.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [deleteWorker.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteWorker.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteAccount.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [deleteAccount.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteAccount.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createClass.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [createClass.pending]: (state, action) => {
            state.loading = true;
        },
        [createClass.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteClass.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [deleteClass.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteClass.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createNote.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [createNote.pending]: (state, action) => {
            state.loading = true;
        },
        [createNote.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [createActiveTeacher.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [createActiveTeacher.pending]: (state, action) => {
            state.loading = true;
        },
        [createActiveTeacher.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [EditActiveTeacher.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [EditActiveTeacher.pending]: (state, action) => {
            state.loading = true;
        },
        [EditActiveTeacher.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteActiveTeacher.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [deleteActiveTeacher.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteActiveTeacher.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }, // Send Message
        // [RoomSendMessage.fulfilled]: (state, action) => {
        //     state.loading = false;
        // },
        // [RoomSendMessage.pending]: (state, action) => {
        //     state.loading = true;
        // },
        // [RoomSendMessage.rejected]: (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // }
    },
});

export const {  } = makeSlice.actions;
export default makeSlice.reducer;