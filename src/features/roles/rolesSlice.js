import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as rolesService from './rolesService';

export const fetchRoles = createAsyncThunk('roles/fetchAll', async () => {
  const res = await rolesService.fetchRolesApi();
  return res.data;
});

export const createRole = createAsyncThunk('roles/create', async (data) => {
  const res = await rolesService.createRoleApi(data);
  return res.data;
});

export const updateRole = createAsyncThunk(
  'roles/update',
  async ({ id, data }) => {
    const res = await rolesService.updateRoleApi(id, data);
    return res.data;
  }
);

export const deleteRole = createAsyncThunk('roles/delete', async (id) => {
  await rolesService.deleteRoleApi(id);
  return id;
});

const rolesSlice = createSlice({
  name: 'roles',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.list = state.list.map((r) =>
          r.id === action.payload.id ? action.payload : r
        );
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.list = state.list.filter((r) => r.id !== action.payload);
      });
  }
});

export default rolesSlice.reducer;
