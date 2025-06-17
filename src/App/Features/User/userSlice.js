import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axiosInstance.get('/user/get-users');
    return response.data;
});


// user delete only admin panel 
export const userDelete = createAsyncThunk('users/userDelete', async ({ id, public_id }) => {
    const response = await axiosInstance.delete(`/user/user-delete/${id}/${public_id}`,);
    return response.data;
});


export const uploadProfilePicture = createAsyncThunk('users/uploadProfilePicture', async ({ id, avatarForm }) => {
    const response = await axiosInstance.post(`/user/upload-profile/${id}`, avatarForm, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
});




const userSlice = createSlice({
    name: 'users',
    initialState: {
        userLists: [],
        loading: true,
        error: null
    },

    reducers: {},
    extraReducers: ((builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.userLists = action.payload.users;
                state.loading = false
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // delete user

            .addCase(userDelete.pending, (state) => {
                state.loading = true;

            })
            .addCase(userDelete.fulfilled, (state, action) => {
                state.loading = false;
                state.userLists = state.userLists.filter((user) => user._id !== action.meta.arg.id)
            })
            .addCase(userDelete.rejected, (state) => {
                state.loading = false;
            })

            // upload profile picture

            .addCase(uploadProfilePicture.pending, (state) => {
                state.loading = true;

            })
            .addCase(uploadProfilePicture.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(uploadProfilePicture.rejected, (state) => {
                state.loading = false;
            })

    })
});

export default userSlice.reducer;