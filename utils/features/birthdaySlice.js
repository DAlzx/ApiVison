import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'


export const birthdaySlice = createSlice({
    name: "validBirthday",
    initialState: {
        validBirthday: null,
        editBirthday: null,
        birthdayValue: "",
        newBirthdayValue: ""
    },
    reducers: {
        setValidBirthday: (state, {payload})=> {
            state.validBirthday = payload;
        },
        setEditBirthday: (state, {payload})=> {
            state.editBirthday = payload;
        },
        setBirthdayValue: (state, {payload})=> {
            state.birthdayValue = payload;
        },
        setNewBirthdayValue: (state, {payload})=> {
            state.newBirthdayValue = payload;
        }
        
    },
});

export const {setValidBirthday, setBirthdayValue, setEditBirthday, setNewBirthdayValue} = birthdaySlice.actions;
export default birthdaySlice.reducer;