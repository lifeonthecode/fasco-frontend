import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";

// create product 
export const createProduct = createAsyncThunk('product/createProduct', async (productData) => {
    const response = await axiosInstance.post('/product/create-product', productData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
});


// get products
export const getProducts = createAsyncThunk('product/getProducts', async () => {
    const response = await axiosInstance.get('/product/products');
    return response.data;
});



// get single product
export const getSingleProduct = createAsyncThunk('product/getSingleProduct', async (id) => {
    const response = await axiosInstance.get(`/product/product/${id}`);
    return response.data;
});



// get single product
export const updateSingleProduct = createAsyncThunk('product/updateProduct', async ({id, productData}) => {
    const response = await axiosInstance.put(`product/update-product/${id}`, productData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
});



// delete single product
export const deleteSingleProduct = createAsyncThunk('product/deleteSingleProduct', async (id) => {
    const response = await axiosInstance.delete(`product/delete-product/${id}`);
    return response.data;
});



// get best products 
export const getBestProducts = createAsyncThunk('product/getBestProduct', async () => {
    const response = await axiosInstance.get(`product/products/best-sellers`);
    return response.data;
});

// get deals products 
export const getDealsProducts = createAsyncThunk('product/getDealsProduct', async () => {
    const response = await axiosInstance.get(`/products/deals`);
    return response.data;
});

// get deals products 
export const productNewArrivals = createAsyncThunk('product/productNewArrivals', async () => {
    const response = await axiosInstance.get(`/product/products/new-arrivals`);
    return response.data;
});




const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: null,
        loading: true,
        error: null
    },
    reducers: {},
    extraReducers: ((builder) => {
        builder
        .addCase(createProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(createProduct.fulfilled, (state) => {
            state.loading = false
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // get products 
        .addCase(getProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })


        // get single product 
        .addCase(getSingleProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(getSingleProduct.fulfilled, (state, action) => {
            state.product = action.payload.product;
            state.loading = false
        })
        .addCase(getSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })


        // update single product 
        .addCase(updateSingleProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(updateSingleProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            state.loading = false
        })
        .addCase(updateSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // delete single product 
        .addCase(deleteSingleProduct.pending, (state) => {
            state.loading = true
        })
        .addCase(deleteSingleProduct.fulfilled, (state, action) => {
            state.singleProduct = action.payload;
            state.loading = false
        })
        .addCase(deleteSingleProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // get best products
        .addCase(getBestProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(getBestProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false
        })
        .addCase(getBestProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // get deals products
        .addCase(getDealsProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(getDealsProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false
        })
        .addCase(getDealsProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // products new arrivals 
        .addCase(productNewArrivals.pending, (state) => {
            state.loading = true
        })
        .addCase(productNewArrivals.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false
        })
        .addCase(productNewArrivals.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })



    })
});

export default productSlice.reducer;