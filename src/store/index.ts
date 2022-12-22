import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../slice/post';
import userReducer from '../slice/user';

const isDev = process.env.NODE_ENV === 'development';
export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
  devTools: isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
