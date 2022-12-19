import { createAction, createReducer, createSlice } from '@reduxjs/toolkit'


export const connectSlice = createSlice({
    name: "connect",
    initialState: {
        connect: false,
        reconnect: false,
        reconnectWhere: ""
    },
    reducers: {
        setConnect: (state, {payload})=> {
            state.connect = payload;
        },
        setReConnect: (state, {payload})=> {
            state.reconnect = payload;
        },
        setReConnectWhere: (state, {payload})=> {
            state.reconnectWhere = payload;
        },
        
    },
});

export const {setConnect, setReConnect, setReConnectWhere} = connectSlice.actions;
export default connectSlice.reducer;

// export const toggleConnect = createAction('connect/toggle')

// export const setConnect = createAction('connect/set')

// export default createReducer(false, (builder) =>
//   builder
//     .addCase(toggleConnect, (state) => {
//       return state === false ? true : false
//     })
//     .addCase(setConnect, (state, action) => {
//       return action.payload
//     })
// )
