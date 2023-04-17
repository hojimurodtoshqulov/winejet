import { createSlice } from "@reduxjs/toolkit";
import { constatns } from "../constants";

const initialState = {
  formType: constatns.form.creating,
  teacher: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { changeFormType, setTeacher } = adminSlice.actions;

export default adminSlice.reducer;
