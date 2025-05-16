import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles : []
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    addArticle(state, action){
        state.articles.push(action.payload);
    },
    concatArticles(state, action){
        state.articles.push(...action.payload);
    },
    clearArticles(state, action) {
        state.articles = [];
    }
  }
});


export const { addArticle, clearArticles, concatArticles } = articlesSlice.actions;
export default articlesSlice.reducer;