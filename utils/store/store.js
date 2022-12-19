import connectReducer from '../features/connectSlice';
import postcodeReducer from '../features/postcodeSlice';
import cityReducer from '../features/citySlice';
import usernameReducer from '../features/usernameSlice';
import emailReducer from '../features/emailSlice';
import birthdayReducer from '../features/birthdaySlice';
import passwordReducer from '../features/passwordSlice';
import phoneReducer from '../features/phoneSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

export default configureStore({
  reducer: {
    connect: connectReducer,
    username: usernameReducer,
    email: emailReducer,
    password: passwordReducer,
    phone: phoneReducer,
    birthday: birthdayReducer,
    city: cityReducer,
    postcode: postcodeReducer,
  },
  middleware: [
    ...getDefaultMiddleware(),

]
})
