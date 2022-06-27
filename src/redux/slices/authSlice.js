import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchAuthMe, fetchRegister } from "../../api/authAPI";

const initialState = {
  data: null,
  status: " loading",
  isAuth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null;
      state.isAuth = false;
    },
  },
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.isAuth = true;
    },
    [fetchLogin.rejected]: (state) => {
      state.data = null;
      state.status = "error";
      state.isAuth = false;
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.isAuth = true;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
      state.isAuth = false;
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.isAuth = true;
    },
    [fetchRegister.rejected]: (state) => {
      state.data = null;
      state.status = "error";
      state.isAuth = false;
    },
  },
});

export const { logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
