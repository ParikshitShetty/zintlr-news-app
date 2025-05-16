import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles : [],
  currentPage : 1,
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
    },
    nextPage(state, action){
        state.currentPage += 1
    },
    prevPage(state, action){
        state.currentPage -= 1
    },
    pageReset(state, action){
        state.currentPage = 1
    }
  }
});


export const { addArticle, clearArticles, concatArticles, nextPage, 
    prevPage, pageReset } = articlesSlice.actions;
export default articlesSlice.reducer;