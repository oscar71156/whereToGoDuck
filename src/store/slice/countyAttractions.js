import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAttractions,
  fetchNearbyAttractions,
  fecthAttractionsByIdAndNearbyType,
} from "../actions/countyAttractions";

const initialState = {
  page: 0,
  data: [],
  isFetchAll: false,
  error: null,
  isLoading: false,
};

const slice = createSlice({
  name: "countyAttractions",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttractions.pending, (state, action) => {
        if (!state.isLoading) {
          state.isLoading = true;
        }
      })
      .addCase(fetchAttractions.fulfilled, (state, action) => {
        const { data, isNewCounty } = action.payload;
        if (data && data.length === 0) {
          state.isFetchAll = true;
        }
        if (isNewCounty) {
          state.page = 0;
          state.data = [];
          state.isFetchAll = false;
          state.error = null;
          state.isLoading = false;
        }
        state.data = state.data.concat(data);
        state.isLoading = false;
        state.page++;
      })
      .addCase(fetchAttractions.rejected, (state, action) => {
        state.error = "內部發生發生錯誤";
        state.isFetchAll = true;
        state.isLoading = false;
      });

    builder
      .addCase(fetchNearbyAttractions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNearbyAttractions.fulfilled, (state, action) => {
        const {isNewNearbyType,data}=action.payload;
        if (data && data.length === 0) {
          state.isFetchAll = true;
        }
        if (isNewNearbyType) {
          state.page = 0;
          state.data = [];
          state.isFetchAll = false;
          state.error = null;
        }
        state.data = state.data.concat(data);
        state.isLoading = false;
        state.page++;
      })
      .addCase(fetchNearbyAttractions.rejected, (state, action) => {
        state.error = "內部發生發生錯誤";
        state.isFetchAll = true;
        state.isLoading = false;
      });

    builder
      .addCase(fecthAttractionsByIdAndNearbyType.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fecthAttractionsByIdAndNearbyType.fulfilled, (state, action) => {
        state.isFetchAll = true;
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(fecthAttractionsByIdAndNearbyType.rejected, (state, action) => {
        state.error = "內部發生發生錯誤";
        state.isFetchAll = true;
        state.isLoading = false;
      });
  },
  initialState,
});

const { actions, reducer: countyAttractionsReducer } = slice;

export const {
  changeCountyAttractionIsFromNearby,
} = actions;

export default countyAttractionsReducer;

