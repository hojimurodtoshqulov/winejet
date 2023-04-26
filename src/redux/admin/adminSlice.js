import { createSlice } from "@reduxjs/toolkit";
import { constatns } from "../constants";

const initialState = {
  formType: constatns.form.creating,
  teacher: null,
  course: null,
  news: null,
  about: null,
  token: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    changeFormType: (state, action) => {
      state.formType = action.payload;
    },
    setTeacher: (state, action) => {
      state.teacher = action.payload;
    },
    setCource: (state, action) => {
      state.course = action.payload;
    },
    setNews: (state, action) => {
      state.news = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAbout: (state, action) => {
      state.about = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeFormType,
  setTeacher,
  setCource,
  setNews,
  setToken,
  setAbout,
} = adminSlice.actions;

export default adminSlice.reducer;
