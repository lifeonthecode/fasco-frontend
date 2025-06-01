import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../App/Features/User/userSlice'
import productReducer from '../App/Features/Product/productSlice'

const store = configureStore({
    reducer: {
        users: userReducer,
        product: productReducer,
    }
});

export default store