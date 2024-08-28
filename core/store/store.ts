import {configureStore} from "@reduxjs/toolkit";
import authSlice from "@/core/store/slice/auth.slice";

/**
 * REDUX STORE INITIALIZATION
 */
const store = configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer:{
        auth: authSlice.reducer
    }
})

export default store
