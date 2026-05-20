import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as usersService from './usersService';

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await usersService.fetchUsersApi();
  return res.data;
});

export const createUser = createAsyncThunk('users/create', async (payload) => {
  const res = await usersService.createUserApi(payload);
  return res.data;
});

export const updateUser = createAsyncThunk(
  'users/update',
  async ({ id, data }) => {
    const res = await usersService.updateUserApi(id, data);
    return res.data;
  }
);

export const removeUser = createAsyncThunk('users/delete', async (id) => {
  await usersService.deleteUserApi(id);
  return id;
});

export const setUserRoles = createAsyncThunk(
  'users/setRoles',
  async ({ id, roleIds }) => {
    const res = await usersService.setUserRolesApi(id, roleIds);
    return res.data;
  }
);

export const toggleUserStatus = createAsyncThunk(
  'users/toggleStatus',
  async (id) => {
    const res = await usersService.toggleUserStatusApi(id);
    return res.data;
  }
);

export const getProfile = createAsyncThunk('users/getProfile', async () => {
  const res = await usersService.getProfileApi();
  return res.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        /* register returns message, not user */
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.list = state.list.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      })
      .addCase(setUserRoles.fulfilled, (state, action) => {
        state.list = state.list.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.list = state.list.map((u) =>
          u.id === action.payload.id
            ? {
                ...u,
                isActive: action.payload.isActive
              }
            : u
        );
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  }
});

export default usersSlice.reducer;
