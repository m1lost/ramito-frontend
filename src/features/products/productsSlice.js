import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productsService from './productsService';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await productsService.fetchProductsApi();
  return res.data;
});

export const createProduct = createAsyncThunk(
  'products/create',
  async (formData) => {
    const res = await productsService.createProductApi(formData);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, formData }) => {
    const res = await productsService.updateProductApi(id, formData);
    return res.data;
  }
);

export const toggleProductStatus = createAsyncThunk(
  'products/toggleStatus',
  async (id) => {
    const res = await productsService.toggleProductStatusApi(id);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await productsService.deleteProductApi(id);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.list = state.list.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(toggleProductStatus.fulfilled, (state, action) => {
        state.list = state.list.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  }
});

export default productsSlice.reducer;
