import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";


// add to cart 
export const addToCartAndUpdate = createAsyncThunk('addToCartAndUpdate', async (cartData) => {
    const response = await axiosInstance.post(`/cart/add-cart`, cartData);
    return response.data;
});


// get all carts 
export const fetchCarts = createAsyncThunk('fetchCarts', async (userId) => {
    const response = await axiosInstance.get(`/cart/carts/${userId}`);
    return response.data;
});


// get all carts 
export const deleteSingleCart = createAsyncThunk('deleteSingleCart', async ({userId, productId}) => {
    const response = await axiosInstance.delete(`/cart/delete-cart/${userId}/${productId}`);
    return response.data;
});




const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartLists: [],
        loading: true,
    },
    reducers: {},
    extraReducers: ((builder) => {
        builder.addCase(addToCartAndUpdate.pending, (state) => {
            state.loading = true
        })
        .addCase(addToCartAndUpdate.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(addToCartAndUpdate.rejected, (state) => {
            state.loading = false
        })

        // get carts 
        .addCase(fetchCarts.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchCarts.fulfilled, (state, action) => {
            state.loading = false;
            state.cartLists = action.payload
        })
        .addCase(fetchCarts.rejected, (state) => {
            state.loading = false
        })

        // delete single cart 
        .addCase(deleteSingleCart.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteSingleCart.fulfilled, (state) => {
            state.loading = false;
        })
        .addCase(deleteSingleCart.rejected, (state) => {
            state.loading = false
        })
    })
});

export default cartSlice.reducer;