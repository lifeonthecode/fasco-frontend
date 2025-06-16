import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";


// create order thunk 
export const createOrder = createAsyncThunk('order/createOrder', async (orderData) => {

    const response = await axiosInstance.post('/order/create-order', orderData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
});


// get only user orders thunk
export const getAllOrdersByUser = createAsyncThunk('order/getAllOrdersByUser', async (userId) => {
    const response = await axiosInstance.get(`/order/orders/${userId}`);
    return response.data;
});

export const getAllOrdersByAdmin = createAsyncThunk('order/getAllOrdersByAdmin', async () => {
    const response = await axiosInstance.get('/order/orders');
    return response.data;
});

export const cancelledOrderByUser = createAsyncThunk('order/cancelledOrderByUser', async (orderId) => {
    const response = await axiosInstance.put(`/order/user-order-cancelled/${orderId}`);  
    return response.data;
});


export const  updateOrderStatusByAdmin= createAsyncThunk('order/updateOrderStatusByAdmin', async ({orderId, orderStatus}) => {
    const response = await axiosInstance.put(`/order/update-order-status-only-admin/${orderId}`, {orderStatus});  
    return response.data;
});

// get single order only admin and user
export const  getSingleOrder= createAsyncThunk('order/getSingleOrder', async (id) => {
    const response = await axiosInstance.get(`/order/order/${id}`);  
    return response.data;
});

// delete single order only admin 
export const  deleteSingleOrder= createAsyncThunk('order/deleteSingleOrder', async (id) => {
    const response = await axiosInstance.delete(`/order/delete/order/${id}`);  
    return response.data;
});


const orderSlice = createSlice({
    name: "order",
    initialState: {
        totalRevenue: 0,
        totalItems: 0,
        orders: [],
        adminOrders: [],
        order: {},
        totalOrders: 0,
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
            })

            // get all orders user 

            .addCase(getAllOrdersByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrdersByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders;
                state.totalItems = action.payload.totalItems
            })
            .addCase(getAllOrdersByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // get all orders by admin

            .addCase(getAllOrdersByAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllOrdersByAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.adminOrders = action.payload.orders;
                state.totalOrders = action.payload.totalOrders;
                state.totalRevenue = action.payload.totalRevenue
            })
            .addCase(getAllOrdersByAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // cancelled order by user

            .addCase(cancelledOrderByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelledOrderByUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(cancelledOrderByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // cancelled order by user

            .addCase(updateOrderStatusByAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatusByAdmin.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateOrderStatusByAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // get single order 
            .addCase(getSingleOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload.order
            })
            .addCase(getSingleOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // get single order 
            .addCase(deleteSingleOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSingleOrder.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteSingleOrder.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default orderSlice.reducer;
