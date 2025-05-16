import { configureStore } from "@reduxjs/toolkit";
import articleReducer from '@/store/slices/articleSlice';
import tabsReducer from '@/store/slices/tabsSlice';

export const store = configureStore({
  reducer: {
    tabs : tabsReducer,
    articles: articleReducer,
  },
});
