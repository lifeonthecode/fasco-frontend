import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";


// create order thunk 
export const createOrder = createAsyncThunk('order/createOrder', async (orderData) => {
    console.log('thunk: Creating order with data:', orderData);
    const response = await axiosInstance.post('/order/create-order', orderData, {
        headers: {
            'Content-Type': 'application/json',
        },  
    });
    return response.data;
}
);

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orderDetails: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default orderSlice.reducer;
