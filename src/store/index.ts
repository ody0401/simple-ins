import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../slice/post';
import userReducer from '../slice/user';

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
