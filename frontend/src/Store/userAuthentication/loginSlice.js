import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:"login",
    initialState: {
        isLoggedIn: false,
        userInfo: null, 
        error: null,
        loading: false,
    },
    reducers: {

    }
})

export default loginSlice.reducer;
