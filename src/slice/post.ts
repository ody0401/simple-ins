import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { addPostAPI, addPostsAPI } from '../actions/post';

export interface Reply {
  name: string;
  email: string;
  reply: string;
  avatar: string;
}
export interface Post {
  id: string;
  name: string;
  email: string;
  avatar: string;
  imageSrc: string[];
  replies: Reply[];
}

export interface PostState {
  posts: Post[];
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: string | null;
  addPostsLoading: boolean;
  addPostsDone: boolean;
  addPostsError: string | null;
}

const initialState: PostState = {
  posts: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addPostsLoading: false,
  addPostsDone: false,
  addPostsError: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    allRemovePost: (state) => {
      state.posts = [];
    },
    addReply: (state, action: PayloadAction<Reply & { postId: string }>) => {
      const { postId, ...data } = action.payload;
      const post = state.posts.filter(
        (post) => post.id === action.payload.postId,
      );
      post[0].replies.push(data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPostAPI.pending, (state, action) => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPostAPI.fulfilled, (state, action) => {
        state.addPostLoading = false;
        state.addPostDone = true;
        state.posts.unshift(action.payload);
      })
      .addCase(addPostAPI.rejected, (state, action) => {
        state.addPostLoading = false;
        state.addPostError = action.error.message as string | null;
      })
      .addCase(addPostsAPI.pending, (state) => {
        state.addPostsLoading = true;
        state.addPostsDone = false;
        state.addPostsError = null;
      })
      .addCase(addPostsAPI.fulfilled, (state, action) => {
        state.addPostsLoading = false;
        state.addPostsDone = true;
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(addPostsAPI.rejected, (state, action) => {
        state.addPostsLoading = false;
        state.addPostsError = action.error.message as string | null;
      });
  },
});

export const { removePost, allRemovePost, addReply } = postSlice.actions;
export default postSlice.reducer;
