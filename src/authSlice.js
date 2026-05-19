import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from './authService';

const tokenFromStorage = localStorage.getItem('token') || null;

export const registerUser = createAsyncThunk('auth/register', async (payload, thunkAPI) => {
  const res = await authService.register(payload);
  return res.data;
});

export const loginUser = createAsyncThunk('auth/login', async (payload, thunkAPI) => {
  const res = await authService.login(payload);
  return res.data;
});

export const verifyUserEmail = createAsyncThunk('auth/verify', async (token) => {
  const res = await authService.verifyEmail(token);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage,
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setUser(state, action) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'registered';
      })
      .addCase(verifyUserEmail.fulfilled, (state) => {
        state.status = 'verified';
      });
  }
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
