import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
  data: [],
  centerAttraction: null,
  isFetchAll: false,
  error: null,
  isLoading: false,
};
const slice = createSlice({
  name: "nearbyAttractions",
  reducers: {
    changeIsFetchAll(state, action) {
      state.isFetchAll = action.payload;
    },
    setIsLoadingData(state, action) {
      state.isLoading = action.payload;
    },
    writeError(state, action) {
      state.error = action.payload;
    },
    ///rest all Nearby value to default except centerAttraction
    restNearbyFetchingStatus(state) {
      let initFetchingStatus = { ...initialState };
      delete initFetchingStatus.centerAttraction;
      const newState = { ...state, ...initFetchingStatus };
      return newState;
    },
    setCenterAttraction(state, action) {
      state.centerAttraction = action.payload;
    },
    fetchAttractions(state, action) {
      console.log("fetchAttractions slice");
      state.data = [...state.data, ...action.payload];
      state.page++;
    },
  },
  initialState,
});

const { actions, reducer: nearbyAttractionsReducer } = slice;

export const {
  changeIsFetchAll,
  setIsLoadingData,
  writeError,
  restNearbyFetchingStatus,
  setCenterAttraction,
  fetchAttractions,
} = actions;

export default nearbyAttractionsReducer;
