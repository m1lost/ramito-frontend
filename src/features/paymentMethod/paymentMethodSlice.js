import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as paymentMethodService from './paymentMethodService';

export const fetchPaymentMethod = createAsyncThunk(
  'paymentMethods/fetchAll',
  async () => {
    const res = await paymentMethodService.fetchPaymentMethodApi();
    return res.data;
  }
);

export const createPaymentMethod = createAsyncThunk(
  'paymentMethods/create',
  async (data) => {
    const res = await paymentMethodService.createPaymentMethodApi(data);
    return res.data;
  }
);

export const updatePaymentMethod = createAsyncThunk(
  'paymentMethods/update',
  async ({ id, data }) => {
    const res = await paymentMethodService.updatePaymentMethodApi(id, data);
    return res.data;
  }
);

export const deletePaymentMethod = createAsyncThunk(
  'paymentMethods/delete',
  async (id) => {
    await paymentMethodService.deletePaymentMethodApi(id);
    return id;
  }
);

export const togglePaymentMethodStatus = createAsyncThunk(
  'paymentMethods/toggleStatus',
  async (id) => {
    const res = await paymentMethodService.togglePaymentMethodStatusApi(id);
    return res.data;
  }
);

const paymentMethodSlice = createSlice({
  name: 'paymentMethods',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentMethod.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createPaymentMethod.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updatePaymentMethod.fulfilled, (state, action) => {
        state.list = state.list.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
      })
      .addCase(togglePaymentMethodStatus.fulfilled, (state, action) => {
        state.list = state.list.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
      })
      .addCase(deletePaymentMethod.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  }
});

export default paymentMethodSlice.reducer;
