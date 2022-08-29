import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/postSlice";
import { authReducer } from "./slices/authSlice";
import { commentReducer } from "./slices/commentSlice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    comments: commentReducer,
  },
});

export default store;
