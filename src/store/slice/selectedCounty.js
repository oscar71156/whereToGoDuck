import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const slice = createSlice({
  name: "selectedCounty",
  reducers: {
    changeInputCounty(state, action) {
      state.value = action.payload;
    },
  },
  initialState,
});

const { reducer: selectedCountyReducer, actions } = slice;

export const { changeInputCounty } = actions;

export default selectedCountyReducer;
