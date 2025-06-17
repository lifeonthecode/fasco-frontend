// src/redux/auth/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../Api/axiosInstance';

// ===========================
// ✅ Async Thunks
// ===========================

export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/login', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

export const userRegister = createAsyncThunk(
    'auth/userRegister',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/register', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

export const fetchSingleUser = createAsyncThunk(
    'auth/fetchSingleUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/user/get-user');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Fetch user failed');
        }
    }
);

export const userLogout = createAsyncThunk(
    'auth/userLogout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/logout');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

// 🔐 Forget Password Flow
export const forgetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/user/forget-password', userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Forget password failed');
        }
    }
);

export const confirmOtpCode = createAsyncThunk(
    'auth/confirmOtpCode',
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/user/confirm-otp-code/${userId}`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'OTP confirmation failed');
        }
    }
);

export const newPassword = createAsyncThunk(
    'auth/newPassword',
    async ({ userId, userData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/user/new-password/${userId}`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Set new password failed');
        }
    }
);

export const resendOtpCode = createAsyncThunk(
    'auth/resendOtpCode',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/user/resend-otp-code/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Resend OTP failed');
        }
    }
);

// ===========================
// ✅ Slice
// ===========================

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        successMessage: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Register
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Load user
            .addCase(fetchSingleUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(fetchSingleUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })

            // Logout
            .addCase(userLogout.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(userLogout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Forget Password
            .addCase(forgetPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Confirm OTP
            .addCase(confirmOtpCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(confirmOtpCode.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(confirmOtpCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // New Password
            .addCase(newPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(newPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(newPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Resend OTP
            .addCase(resendOtpCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(resendOtpCode.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(resendOtpCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError, clearSuccessMessage } = authSlice.actions;

export default authSlice.reducer;
