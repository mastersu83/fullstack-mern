import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./instanceAPI";

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async () => {
    const { data } = await axios.get("comment");
    return data;
  }
);
export const fetchPostComments = createAsyncThunk(
  "comment/fetchPostComments",
  async (id) => {
    const { data } = await axios.get(`comments/post/${id}`);
    return data;
  }
);

export const removeComment = createAsyncThunk(
  "comment/removeComment",
  async (id) => {
    await axios.delete(`comments/${id}`);
  }
);
