import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  page: 0,
  data: [],
  isFetchAll: false,
  ///因為首頁景點及附近景點細節會呈現在同一頁(path:"/:county/:attraction")，用此作為判斷
  isCountyAttractionFromNearby: false,
  error: null,
  isLoading: false,
};
const slice = createSlice({
  name: "countyAttractions",
  reducers: {
    setIsLoadingData(state, action) {
      state.isLoading = action.payload;
    },
    fetchAllData(state) {
      state.isFetchAll = true;
    },
    fetchAttractions(state, action) {
      state.data = [...state.data, ...action.payload];
      state.page++;
    },
    writeError(state, action) {
      state.error = action.payload;
    },
    resetCountyStatus() {
      return initialState;
    },
    changeCountyAttractionIsFromNearby(state, action) {
      state.isCountyAttractionFromNearby = action.payload;
    },
  },
  initialState,
});

const { actions, reducer: countyAttractionsReducer } = slice;

export const {
  setIsLoadingData,
  fetchAllData,
  fetchAttractions,
  writeError,
  resetCountyStatus,
  changeCountyAttractionIsFromNearby,
} = actions;

export default countyAttractionsReducer;
