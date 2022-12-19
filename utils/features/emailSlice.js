import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'


export const emailSlice = createSlice({
    name: "validEmail",
    initialState: {
        validEmail: null,
        editEmail: null,
        emailValue: "",
        oldEmailValue: "",
        newEmailValue: "",
    },
    reducers: {
        setValidEmail: (state, {payload})=> {
            state.validEmail = payload;
        },
        setEmailValue: (state, {payload})=> {
            state.emailValue = payload;
        },
        setOldEmailValue: (state, {payload})=> {
            state.oldEmailValue = payload;
        },
        setNewEmailValue: (state, {payload})=> {
            state.newEmailValue = payload;
        },
        setEditEmail: (state, {payload})=> {
            state.editEmail = payload;
        }
        
    },
});

export const {setValidEmail, setEmailValue, setEditEmail, setOldEmailValue, setNewEmailValue} = emailSlice.actions;
export default emailSlice.reducer;