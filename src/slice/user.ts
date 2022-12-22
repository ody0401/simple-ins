import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { joinAPI, loginAPI } from '../actions/user';
import { addPostAPI } from '../actions/post';
import { postSlice } from './post';

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  password: string;
}
export interface UserState {
  user: Omit<User, 'password'> | null;
  joinLoading: boolean;
  joinDone: boolean;
  joinError: string | null;
  joinSuccessMsg: string | null;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: string | null;
}

const initialState: UserState = {
  user: null,
  joinLoading: false,
  joinDone: false,
  joinError: null,
  joinSuccessMsg: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(joinAPI.pending, (state, action) => {
        state.joinLoading = true;
        state.joinDone = false;
        state.joinError = null;
        state.joinSuccessMsg = null;
      })
      .addCase(joinAPI.fulfilled, (state, action) => {
        state.joinLoading = false;
        state.joinDone = true;
        state.joinSuccessMsg = action.payload;
      })
      .addCase(joinAPI.rejected, (state, action) => {
        state.joinLoading = false;
        state.joinError = action.payload as string;
      })
      .addCase(loginAPI.pending, (state, action) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.user = action.payload;
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
