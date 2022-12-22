import { createAsyncThunk } from '@reduxjs/toolkit';
import { join, login } from '../api/user';
import { User } from '../slice/user';

export const loginAPI = createAsyncThunk(
  'user/login',
  async (data: Pick<User, 'email' | 'password'>, { rejectWithValue }) => {
    try {
      const response = await login(data);
      return response;
    } catch (error) {
      const errorMeg = error as string;
      return rejectWithValue(errorMeg as string);
    }
  },
);

export const joinAPI = createAsyncThunk(
  'user/join',
  async (
    data: Pick<User, 'name' | 'email' | 'password'>,
    { rejectWithValue },
  ) => {
    try {
      return await join(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
