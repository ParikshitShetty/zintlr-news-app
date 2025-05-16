import { configureStore } from "@reduxjs/toolkit";
import tabsReducer from "../features/tabs/tabsSlice";

export const store = configureStore({
  reducer: { tabs: tabsReducer },
});
