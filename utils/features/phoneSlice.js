import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'


export const phoneSlice = createSlice({
    name: "validPhone",
    initialState: {
        validPhone: null,
        editPhone: null,
        phoneValue: "100000000",
        newPhoneValue: "",
    },
    reducers: {
        setValidPhone: (state, {payload})=> {
            state.validPhone = payload;
        },
        setPhoneValue: (state, {payload})=> {
            state.phoneValue = payload;
        },
        setNewPhoneValue: (state, {payload})=> {
            state.newPhoneValue = payload;
        },
        setEditPhone: (state, {payload})=> {
            state.editPhone = payload;
        }
        
    },
});

export const {setValidPhone, setPhoneValue, setEditPhone,setNewPhoneValue} = phoneSlice.actions;
export default phoneSlice.reducer;