import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as ordersService from './ordersService';

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  const res = await ordersService.fetchOrdersApi();
  return res.data;
});

export const createOrder = createAsyncThunk(
  'orders/create',
  async (payload) => {
    const res = await ordersService.createOrderApi(payload);
    return res.data;
  }
);

export const removeOrder = createAsyncThunk('orders/delete', async (id) => {
  await ordersService.deleteOrderApi(id);
  return id;
});

export const removeOrderItem = createAsyncThunk(
  'orders/items/delete',
  async (id) => {
    await ordersService.deleteOrderItemApi(id);
    return id;
  }
);


const ordersSlice = createSlice({
  name: 'orders',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.list = [...state.list, action.payload];
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.list = state.list.filter((o) => o.id !== action.payload);
      })
      .addCase(removeOrderItem.fulfilled, (state, action) => {
        state.list = state.list.map((o) =>
          o.id === action.payload.id
            ? {
                ...o,
                items: o.items.filter((i) => i.id !== action.payload.itemId)
              }
            : o
        );
      })
      ;
  }
});

export default ordersSlice.reducer;
