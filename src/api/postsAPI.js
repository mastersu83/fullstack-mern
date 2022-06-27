import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./instanceAPI";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const postsAPI = createApi({
  reducerPath: "postsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4444/",
  }),
  endpoints: (build) => ({
    getFullPost: build.query({
      query: (id) => ({
        url: `posts/${id}`,
      }),
    }),
  }),
});

export const { useGetFullPostQuery } = postsAPI;

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
