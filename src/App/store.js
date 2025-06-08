import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../App/Features/User/userSlice'
import productReducer from '../App/Features/Product/productSlice'
import cartReducer from '../App/Features/Cart/cartSlice'
import orderSlice from '../App/Features/Order/orderSlice';

const store = configureStore({
    reducer: {
        users: userReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderSlice,
    }
});

export default store