import { createSlice } from "@reduxjs/toolkit";

const load = key => {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};

const initialState = {
  articles : load('article'),
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
        const newArticles = action.payload;
        newArticles.forEach(article => {
          if (!state.articles.some(a => a.title === article.title)) {
            state.articles.push(article);
          };
        });
        localStorage.setItem("article", JSON.stringify(state.articles));
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