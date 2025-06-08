import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";

// add a product to the wishlist
export const addWishlist = createAsyncThunk(
    'wishlist/addWishlist',
    async (wishlistData) => {
        const response = await axiosInstance.post(`/wishlist/add-wishlist`, wishlistData);
        return response.data;

    });

// get wishlist items for a user
export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (userId) => {
        const response = await axiosInstance.get(`/wishlist/wishlists/${userId}`);
        return response.data;

    });

// delete single wishlist
export const deleteSingleWishlist = createAsyncThunk(
    'wishlist/deleteSingleWishlist',
    async ({ userId, productId }) => {
        const response = await axiosInstance.delete(`/wishlist/delete-wishlist/${userId}/${productId}`);
        return response.data;

    });

// delete single wishlist
export const deleteAllWishlist = createAsyncThunk(
    'wishlist/deleteAllWishlist',
    async (userId) => {
        const response = await axiosInstance.delete(`/delete-all-wishlist/${userId}`);
        return response.data;

    });


const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlists: {
            products: [],
            totalItems: 0,
        },
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addWishlist.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // get wishlist items
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlists.products = action.payload.wishlist.products;
                state.wishlists.totalItems = action.payload.totalWishlistItems;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete single wishlist
            .addCase(deleteSingleWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSingleWishlist.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteSingleWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // delete all wishlist
            .addCase(deleteAllWishlist.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAllWishlist.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteAllWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export default wishlistSlice.reducer; 