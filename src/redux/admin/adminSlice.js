import { createSlice } from "@reduxjs/toolkit";
import { constatns } from "../constants";

const initialState = {
  formType: constatns.form.creating,
  teacher: null,
  course: null,
  news: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { changeFormType, setTeacher, setCource, setNews } =
  adminSlice.actions;

export default adminSlice.reducer;
