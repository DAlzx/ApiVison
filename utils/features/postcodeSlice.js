import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'


export const postCodeSlice = createSlice({
    name: "validPostcode",
    initialState: {
        validPostcode: null,
        editPostcode: null,
        postcodeValue: "",
        newPostcodeValue: "",
    },
    reducers: {
        setValidPostcode: (state, {payload})=> {
            state.validPostcode = payload;
        },
        setPostcodeValue: (state, {payload})=> {
            state.postcodeValue = payload;
        },
        setNewPostcodeValue: (state, {payload})=> {
            state.newPostcodeValue = payload;
        },
        setEditPostcode: (state, {payload})=> {
            state.editPostcode = payload;
        }
        
    },
});

export const {setValidPostcode, setPostcodeValue,setEditPostcode,setNewPostcodeValue} = postCodeSlice.actions;
export default postCodeSlice.reducer;