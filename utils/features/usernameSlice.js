import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'


export const usernameSlice = createSlice({
    name: "validUsername",
    initialState: {
        validUsername: null,
        editUsername: null,
        usernameValue: "",
        newUsernameValue: "",
    },
    reducers: {
        setValidUsername: (state, {payload})=> {
            state.validUsername = payload;
        },
        setUsernameValue: (state, {payload})=> {
            state.usernameValue = payload;
        },
        setNewUsernameValue: (state, {payload})=> {
            state.newUsernameValue = payload;
        },
        setEditUsername: (state, {payload})=> {
            state.editUsername = payload;
        }
        
    },
});

export const {setValidUsername, setUsernameValue,setEditUsername,setNewUsernameValue} = usernameSlice.actions;
export default usernameSlice.reducer;