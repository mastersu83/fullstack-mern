import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./instanceAPI";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("posts");
  return data;
});
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("tags");
  return data;
});
export const removePost = createAsyncThunk("posts/removePost", async (id) => {
  await axios.delete(`posts/${id}`);
});
