import { configureStore } from "@reduxjs/toolkit";
import articleReducer from '@/store/slices/articleSlice';

export const store = configureStore({
  reducer: {
    articles: articleReducer,
  },
});
