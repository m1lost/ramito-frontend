import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as categoriesService from './categoriesService';

export const fetchCategories = createAsyncThunk(
  'category/fetchAll',
  async () => {
    const res = await categoriesService.fetchCategoriesApi();
    return res.data;
  }
);

export const createCategory = createAsyncThunk(
  'category/create',
  async (data) => {
    const res = await categoriesService.createCategoryApi(data);
    return res.data;
  }
);

export const updateCategory = createAsyncThunk(
  'category/update',
  async ({ id, data }) => {
    const res = await categoriesService.updateCategoryApi(id, data);
    return res.data;
  }
);

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id) => {
    await categoriesService.deleteCategoryApi(id);
    return id;
  }
);

export const toggleCategoryStatus = createAsyncThunk(
  'category/toggleStatus',
  async (id) => {
    const res = await categoriesService.toggleCategoryStatusApi(id);
    return res.data;
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.list = state.list.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
      })
      .addCase(toggleCategoryStatus.fulfilled, (state, action) => {
        state.list = state.list.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  }
});

export default categoriesSlice.reducer;
