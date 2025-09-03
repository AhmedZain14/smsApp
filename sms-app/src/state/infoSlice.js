import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { json, useNavigate } from "react-router-dom";


export const getInfoNotes = createAsyncThunk(

    "infos/getInfoNotes",
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

export const getPrivateNotes = createAsyncThunk(

    "infos/getPrivateNotes",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/privateNotes`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

export const getInfoAccounts = createAsyncThunk(

    "infos/getInfoAccounts",
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

export const getInfoTeachers = createAsyncThunk(

    "infos/getInfoTeachers",
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

export const getInfoActiveTeachers = createAsyncThunk(

    "infos/getInfoActiveTeachers",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/teachers`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

export const getInfoStudents = createAsyncThunk(

    "infos/getInfoStudents",
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

export const getInfoClasses = createAsyncThunk(

    "infos/getInfoClasses",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/classes`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

export const getInfoWorkers = createAsyncThunk(

    "infos/getInfoWorkers",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/workers`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }
    
);

export const getInfoReports = createAsyncThunk(

    "infos/getInfoReports",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/reports`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }
    
);

export const getInfoFinancialAccounts = createAsyncThunk(

    "infos/getInfoFinancialAccounts",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/FinancialAccounts`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }
    
);

export const getInfoFinancialBalance = createAsyncThunk(

    "infos/getInfoFinancialBalance",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/FinancialBalance`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }
    
);

export const getInfoParents = createAsyncThunk(

    "infos/getInfoParents",
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

export const getInfoSystemSetting= createAsyncThunk(

    "infos/getInfoSystemSetting",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/systemSetting/1`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }
    
);

export const reportEdit = createAsyncThunk(

    "infos/reportEdit",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/reports/${action.id}`, {
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

export const accountEdit = createAsyncThunk(

    "infos/accountEdit",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/accounts/${action.id}`, {
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

export const RoomSendMessage = createAsyncThunk(

    "infos/RoomSendMessage",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/classes/${action.id}`, {
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

export const getInfoExams = createAsyncThunk(

    "infos/getInfoExams",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/exams`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }
    
);

export const deleteExam = createAsyncThunk(

    "infos/deleteExam",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/exams/${action.id}`, {
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

export const sendExamSolution = createAsyncThunk(

    "infos/sendExamSolution",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/examSolutions`, {
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

export const getExamSolution = createAsyncThunk(

    "infos/getExamSolution",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/examSolutions`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

export const deleteExamSolution = createAsyncThunk(

    "infos/deleteExamSolution",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/examSolutions/${action}`, {
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

export const getInfoGrades = createAsyncThunk(

    "infos/getInfoGrades",
    async(_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/grades`);
            const data = await res.json();
            return data;
        } catch (error){
            return rejectWithValue(error.message);
        }
    }

);

export const createGrades = createAsyncThunk(

    "infos/createGrades",
    async(action, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try{
            const res = await fetch(`http://localhost:3006/grades`, {
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

// const userAccount = JSON.parse(localStorage.getItem('user'));

const initialState = {
    notes: {count: null, value: []},
    privateNotes: {count: null, value: []},
    accounts: {count: null, value: []},
    teachers: {count: null, value: [], activeTeachers: []},
    students: {count: null, value: []},
    parents: {count: null, value: []},
    classes: {count: null, value: []},
    workers: {count: null, value: []},
    reports: {count: null, value: []},
    moneySafe: {count: null, value: []},
    examSolution: [],
    exams: [],
    grades: [],
    systemSetting: {},
    headerPath: "",
    error: null,
    loading: true
};
export const infoSlice = createSlice({
    name:'infos',
    initialState,
    reducers: {
        changeHeaderPath: (state, action) => {
            state.headerPath = action.payload;
        }
    },
    extraReducers: {
        [getInfoNotes.fulfilled]: (state, action) => {
            state.loading = false;
            state.notes.count = [...action.payload].length;
            state.notes.value.push([...action.payload]);

        },
        [getInfoNotes.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoNotes.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ===================================================
        [getPrivateNotes.fulfilled]: (state, action) => {
            state.loading = false;
            state.privateNotes.count = [...action.payload].length;
            state.privateNotes.value.push([...action.payload]);

        },
        [getPrivateNotes.pending]: (state, action) => {
            state.loading = true;
        },
        [getPrivateNotes.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoAccounts ] ============
        [getInfoAccounts.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log([...action.payload]);
            state.accounts.count = [...action.payload].length;
            state.accounts.value.push([...action.payload]);

        },
        [getInfoAccounts.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoAccounts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoTeachers ] ============
        [getInfoTeachers.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log([...action.payload]);
            let teacherFiltered = [...action.payload].filter( (item) => {
                return item.role === "teacher";
            });
            // console.log([...teacherFiltered]);
            state.teachers.count = [...teacherFiltered].length;
            state.teachers.value.push([...teacherFiltered]);

        },
        [getInfoTeachers.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoTeachers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoActiveTeachers ] ============
        [getInfoActiveTeachers.fulfilled]: (state, action) => {
            state.loading = false;
            state.teachers.ActiveTeachers = [...action.payload];
        },
        [getInfoActiveTeachers.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoActiveTeachers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoStudents ] ============
        [getInfoStudents.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log([...action.payload]);
            let studentsFiltered = [...action.payload].filter( (item) => {
                return item.role === "student";
            });
            // console.log([...studentsFiltered]);
            state.students.count = [...studentsFiltered].length;
            state.students.value.push([...studentsFiltered]);
        },
        [getInfoStudents.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoStudents.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoClasses ] ============
        [getInfoClasses.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log([...action.payload]);
            state.classes.count = [...action.payload].length;
            state.classes.value.push([...action.payload]);

        },
        [getInfoClasses.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoClasses.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoWorkers ] ============
        [getInfoWorkers.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log([...action.payload]);
            state.workers.count = [...action.payload].length;
            state.workers.value.push([...action.payload]);

        },
        [getInfoWorkers.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoWorkers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoReports ] ============
        [getInfoReports.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log([...action.payload]);
            state.reports.count = [...action.payload].length;
            state.reports.value.push([...action.payload]);

        },
        [getInfoReports.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoReports.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoParents ] ============
        [getInfoParents.fulfilled]: (state, action) => {
            state.loading = false;
            // console.log([...action.payload]);
            let parentsFiltered = [...action.payload].filter( (item) => {
                return item.role === "parent";
            });
            // console.log([...studentsFiltered]);
            state.parents.count = [...parentsFiltered].length;
            state.parents.value.push([...parentsFiltered]);
        },
        [getInfoParents.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoParents.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoFinancialAccounts ] ============
        [getInfoFinancialAccounts.fulfilled]: (state, action) => {
            // console.log("mnnyy", action)
            state.moneySafe.value.push([...action.payload]);
        },
        [getInfoFinancialAccounts.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoFinancialAccounts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoFinancialBalance ] ============
        [getInfoFinancialBalance.fulfilled]: (state, action) => {
            // console.log("mnnyy", action)
            state.moneySafe.count = action.payload.value.toFixed(3);
        },
        [getInfoFinancialBalance.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoFinancialBalance.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ getInfoSystemSetting ] ============
        [getInfoSystemSetting.fulfilled]: (state, action) => {
            state.systemSetting = action.payload
            localStorage.setItem("systemSetting", JSON.stringify(action.payload))
        },
        [getInfoSystemSetting.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoSystemSetting.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // ============ Start [ Send Message ] ============
        [RoomSendMessage.fulfilled]: (state, action) => {
            state.classes.value[0] = state.classes.value[0].map((e) => {
                if(e.id === action.payload.id){
                    return action.payload
                }else{
                    return e
                }
            })
            // console.log("from slice", action.payload)
        },
        [RoomSendMessage.pending]: (state, action) => {
            state.loading = true;
        },
        [RoomSendMessage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getInfoExams.fulfilled]: (state, action) => {
            state.loading = false;
            state.exams = [...action.payload];
        },
        [getInfoExams.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoExams.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteExam.fulfilled]: (state, action) => {
            state.loading = false;
            state.exams = [...action.payload];
        },
        [deleteExam.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteExam.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getExamSolution.fulfilled]: (state, action) => {
            state.loading = false;
            state.examSolution = [...action.payload];
        },
        [getExamSolution.pending]: (state, action) => {
            state.loading = true;
        },
        [getExamSolution.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getInfoGrades.fulfilled]: (state, action) => {
            state.loading = false;
            state.grades = [...action.payload];
        },
        [getInfoGrades.pending]: (state, action) => {
            state.loading = true;
        },
        [getInfoGrades.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { changeHeaderPath } = infoSlice.actions;
export default infoSlice.reducer;