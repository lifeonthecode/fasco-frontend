import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";


export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axiosInstance.get('/user/get-users');
    return response.data;
});
export const fetchSingleUser = createAsyncThunk('users/fetchSingleUser', async () => {
    const response = await axiosInstance.get('/user/get-user');
    return response.data;
});


export const userRegister = createAsyncThunk('users/userRegister', async (userData) => {
    const response = await axiosInstance.post('/user/register', userData);
    return response.data;
});
export const userLogin = createAsyncThunk('users/userLogin', async (userData) => {
    const response = await axiosInstance.post('/user/login', userData);
    return response.data;
});


export const userLogout = createAsyncThunk('users/userLogout', async () => {
    const response = await axiosInstance.post('/user/logout');
    return response.data;
});

// user delete only admin panel 
export const userDelete = createAsyncThunk('users/userDelete', async ({id, public_id}) => {
    const response = await axiosInstance.delete(`/user-delete/${id}/${public_id}`, );
    return response.data;
});


export const uploadProfilePicture = createAsyncThunk('users/uploadProfilePicture', async ({id,avatarForm}) => {
    const response = await axiosInstance.post(`/user/upload-profile/${id}`, avatarForm, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
});


export const forgetPassword = createAsyncThunk('users/forgetPassword', async (userData) => {
    const response = await axiosInstance.post('/user/forget-password', userData);
    return response.data;
});

export const confirmOtpCode = createAsyncThunk('users/confirmOtpCode', async ({ userId, userData }) => {
    const response = await axiosInstance.post(`/user/confirm-otp-code/${userId}`, userData);
    return response.data;
});

export const newPassword = createAsyncThunk('users/newPassword', async ({ userId, userData }) => {
    const response = await axiosInstance.post(`/user/new-password/${userId}`, userData);
    return response.data;
});

export const resendOtpCode = createAsyncThunk('users/resendOtpCode', async (userId) => {
    const response = await axiosInstance.post(`/user/resend-otp-code/${userId}`);
    return response.data;
});


const userSlice = createSlice({
    name: 'users',
    initialState: {
        userLists: [],
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null
    },

    reducers: {},
    extraReducers: ((builder) => {
        builder
        // .addCase(fetchUsers.pending, (state) => {
        //     state.loading = true
        // })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.userLists = action.payload.users;
                state.loading = false
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            // single user get
            .addCase(fetchSingleUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true
            })
            .addCase(fetchSingleUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })

            .addCase(userRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(userRegister.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(userRegister.rejected, (state) => {
                state.loading = false;
            })

            // user login 

            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(userLogin.rejected, (state) => {
                state.loading = false;
            })

            // user logout

            .addCase(userLogout.pending, (state) => {
                state.loading = true;
                
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(userLogout.rejected, (state, action) => {
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


            // forget password 
            .addCase(forgetPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(forgetPassword.rejected, (state) => {
                state.loading = false;
            })


            // confirm otp code 

            .addCase(confirmOtpCode.pending, (state) => {
                state.loading = true
            })
            .addCase(confirmOtpCode.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(confirmOtpCode.rejected, (state) => {
                state.loading = false;
            })


            // new password 
            .addCase(newPassword.pending, (state) => {
                state.loading = true
            })
            .addCase(newPassword.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(newPassword.rejected, (state) => {
                state.loading = false;
            })

            // resend otp code 
            .addCase(resendOtpCode.pending, (state) => {
                state.loading = true
            })
            .addCase(resendOtpCode.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload
            })
            .addCase(resendOtpCode.rejected, (state) => {
                state.loading = false;
            })


    })
});

export default userSlice.reducer;