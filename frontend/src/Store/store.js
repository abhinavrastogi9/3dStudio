import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './userAuthentication/authenticationSlice.js';
const store=configureStore({
reducer:{
authenticationSlice:authenticationSlice
}
});
export default store;