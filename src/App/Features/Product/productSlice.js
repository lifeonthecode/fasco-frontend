import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../Api/axiosInstance";
import { QueryStatus } from "@reduxjs/toolkit/query";

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
export const getProducts = createAsyncThunk('product/getProducts', async ({page, sizes, colors, priceRanges, brands, sort}) => {
    const response = await axiosInstance.get(`/product/products?page=${page}&sizes=${JSON.stringify(sizes)}&colors=${JSON.stringify(colors)}&prices=${JSON.stringify(priceRanges)}&brands=${JSON.stringify(brands)}&sort=${sort}`);
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



export const fetchBestProducts = createAsyncThunk('fetchBestProducts', async () => {
    const response = await axiosInstance.get(`product/best-seller/products`);
    return response.data;
})

export const accessoriesProducts = createAsyncThunk('accessoriesProducts', async ({category}) => {
    const response = await axiosInstance.get(`product/products/accessories?category=${category}`);
    return response.data;
})

// get deals products 
export const getDealsProducts = createAsyncThunk('product/getDealsProduct', async () => {
    const response = await axiosInstance.get(`/product/products/deals`);
    return response.data;
});

// get deals products 
export const productNewArrivals = createAsyncThunk('product/productNewArrivals', async ({category}) => {
    const response = await axiosInstance.get(`/product/products/new-arrivals?category=${category}`);
    return response.data;
});

// get admin products 
export const getByAdminAllProducts = createAsyncThunk('product/getByAdminAllProducts', async () => {
    const response = await axiosInstance.get(`/product/admin/products`);
    return response.data;
});




const productSlice = createSlice({
    name: 'product',
    initialState: {
        productList: {},
        product: null,
        arrivals: [],
        bestProducts: [],
        accessories: [],
        deals: [],
        adminCountTotalProducts: 0,
        adminProducts: [],
        loading: true,
        error: null,
        search: '',
    },
    reducers: {
        search: (state, action) => {
            state.search = action.payload;
        },
        removeSearch: (state) => {
            state.search = '';
        },
    },
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
            state.productList = action.payload;
            
            state.loading = false
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
        // get admin products 
        .addCase(getByAdminAllProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(getByAdminAllProducts.fulfilled, (state, action) => {
            state.adminProducts = action.payload.products;
            state.adminCountTotalProducts = action.payload.totalProducts;
            state.loading = false
        })
        .addCase(getByAdminAllProducts.rejected, (state, action) => {
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
        .addCase(fetchBestProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchBestProducts.fulfilled, (state, action) => {
            state.bestProducts = action.payload.products;
            state.loading = false
        })
        .addCase(fetchBestProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })

        // get deals products
        .addCase(getDealsProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(getDealsProducts.fulfilled, (state, action) => {
            state.deals = action.payload.products;
            state.loading = false
        })
        .addCase(getDealsProducts.rejected, (state) => {
            state.loading = false;
        })

        // products new arrivals 
        .addCase(productNewArrivals.pending, (state) => {
            state.loading = true
        })
        .addCase(productNewArrivals.fulfilled, (state, action) => {
            state.arrivals = action.payload.products;
            state.loading = false
        })
        .addCase(productNewArrivals.rejected, (state) => {
            state.loading = false;
        })
        // products accessories
        .addCase(accessoriesProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(accessoriesProducts.fulfilled, (state, action) => {
            state.accessories = action.payload.products;
            state.loading = false
        })
        .addCase(accessoriesProducts.rejected, (state) => {
            state.loading = false;
        })



    })
});

export default productSlice.reducer;
export const { search, removeSearch } = productSlice.actions;