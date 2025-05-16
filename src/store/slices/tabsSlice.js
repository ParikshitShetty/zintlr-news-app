import { createSlice } from "@reduxjs/toolkit";

const load = key => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};

const initialState = {
  open:   load("openTabs"),
  closed: load("closedTabs"),
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    openTab(state, action) {
      const id = action.payload;
      if (!state.open.includes(id)) {
        state.open.push(id);
        localStorage.setItem("openTabs", JSON.stringify(state.open));
      }
    },
    closeTab(state, action) {
      const id = action.payload;
      state.open = state.open.filter(x => x !== id);
      state.closed.unshift(id);
      localStorage.setItem("openTabs", JSON.stringify(state.open));
      localStorage.setItem("closedTabs", JSON.stringify(state.closed));
    },
  },
});

export const { openTab, closeTab } = tabsSlice.actions;
export default tabsSlice.reducer;