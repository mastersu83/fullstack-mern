import { createSlice } from "@reduxjs/toolkit";
import { fetchPostComments, removeComment } from "../../api/commentsAPI";

const initialState = {
  comments: {
    items: [],
    status: "loading",
  },
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.items.push(action.payload.data);
    },
  },
  extraReducers: {
    [fetchPostComments.pending]: (state) => {
      state.comments.status = "loading";
    },
    [fetchPostComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchPostComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
    [removeComment.pending]: (state, action) => {
      state.comments.items = state.comments.items.filter(
        (i) => i._id !== action.meta.arg
      );
    },
  },
});

export const { addComment } = commentSlice.actions;

export const commentReducer = commentSlice.reducer;
