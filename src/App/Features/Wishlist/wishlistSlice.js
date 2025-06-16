import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";

// add a product to the wishlist
export const addWishlist = createAsyncThunk(
    'wishlist/addWishlist',
    async ({userId, productId}) => {
        const response = await axiosInstance.post(`/wishlist/add-wishlist`, {
            userId, 
            productId
        });
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
        const response = await axiosInstance.delete(`/wishlist/delete-all-wishlist/${userId}`);
        return response.data;

    });


const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        loading: true,
        wishlists: [],
        totalItems: 0,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(addWishlist.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addWishlist.rejected, (state) => {
                state.loading = false;
            })

            // get wishlist items
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.wishlists = action.payload.wishlist;
                state.totalItems = action.payload.totalWishlistItems;
            })
            .addCase(fetchWishlist.rejected, (state) => {
                state.loading = false;
            })

            // delete single wishlist
            .addCase(deleteSingleWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteSingleWishlist.fulfilled, (state) => {
                state.loading = false;
                state.wishlists = [];
                state.totalItems = 0
            })
            .addCase(deleteSingleWishlist.rejected, (state) => {
                state.loading = false;
            })

            // delete all wishlist
            .addCase(deleteAllWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteAllWishlist.fulfilled, (state) => {
                state.loading = false;
                state.wishlists = [];
                state.totalItems = 0
            })
            .addCase(deleteAllWishlist.rejected, (state) => {
                state.loading = false;
            })
    },
});

export default wishlistSlice.reducer; 