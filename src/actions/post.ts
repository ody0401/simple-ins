import { createAsyncThunk } from '@reduxjs/toolkit';
import { addPost, addPosts } from '../api/post';
import { Post } from '../slice/post';

export const addPostAPI = createAsyncThunk(
  'post/addPost',
  async (data: Omit<Post, 'id'>, { rejectWithValue }) => {
    try {
      const response = await addPost(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const addPostsAPI = createAsyncThunk(
  'post/addPosts',
  async (_, { rejectWithValue }) => {
    try {
      return await addPosts();
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
