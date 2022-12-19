import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'


export const citySlice = createSlice({
    name: "validCity",
    initialState: {
        validCity: null,
        editCity: null,
        cityValue: "",
        newCityValue: "",

    },
    reducers: {
        setValidCity: (state, {payload})=> {
            state.validCity = payload;
        },
        setCityValue: (state, {payload})=> {
            state.cityValue = payload;
        },
        setNewCityValue: (state, {payload})=> {
            state.newCityValue = payload;
        },
        setEditCity: (state, {payload})=> {
            state.editCity = payload;
        }
        
    },
});

export const {setValidCity, setCityValue, setEditCity, setNewCityValue} = citySlice.actions;
export default citySlice.reducer;