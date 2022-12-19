import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'


export const passwordSlice = createSlice({
    name: "validPassword",
    initialState: {
        validPassword: null,
        editPassword: null,
        passwordValue: "",
        newPasswordValue: ""
    },
    reducers: {
        setValidPassword: (state, {payload})=> {
            state.validPassword = payload;
        },
        setPasswordValue: (state, {payload})=> {
            state.passwordValue = payload;
        },
        setNewPasswordValue: (state, {payload})=> {
            state.newPasswordValue = payload;
        },
        setEditPassword: (state, {payload})=> {
            state.editPassword = payload;
        }
        
    },
});

export const {setValidPassword, setPasswordValue, setEditPassword, setNewPasswordValue} = passwordSlice.actions;
export default passwordSlice.reducer;