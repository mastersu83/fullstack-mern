import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./instanceAPI";

// export const postsAPI = createApi({
//   reducerPath: "postsAPI",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:4444/",
//   }),
//   endpoints: (build) => ({
//     getFullPost: build.query({
//       query: (id) => ({
//         url: `posts/${id}`,
//       }),
//     }),
//   }),
// });

// export const { useGetFullPostQuery } = postsAPI;

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (params) => {
    const { data } = await axios.post("auth/login", params);
    return data;
  }
);
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("auth/register", params);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("auth/me");
  return data;
});
