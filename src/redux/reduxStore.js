import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postSlice";
import { postsAPI } from "../api/postsAPI";
import { authReducer } from "./slices/authSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    [postsAPI.reducerPath]: postsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsAPI.middleware),
});

export default store;
