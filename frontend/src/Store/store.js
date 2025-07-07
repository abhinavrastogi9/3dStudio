import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './userAuthentication/loginSlice.js';
const store=configureStore({
reducer:{
loginSlice:loginSlice
}
});
export default store;