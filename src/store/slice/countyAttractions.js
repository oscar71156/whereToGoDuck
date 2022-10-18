import { createSlice } from "@reduxjs/toolkit";
import { fetchAttractions, fecthAttractionsByIdAndCounty } from "../actions/countyAttractions";

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
    resetCountyStatus() {
      return initialState;
    },
    changeCountyAttractionIsFromNearby(state, action) {
      state.isCountyAttractionFromNearby = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttractions.pending, (state, action) => {
        if (!state.isLoading) {
          state.isLoading = true;
        }
      })
      .addCase(fetchAttractions.fulfilled, (state, action) => {
        if (action.payload && action.payload.length === 0) {
          state.isFetchAll = true;
        }
        state.data = state.data.concat(action.payload);
        state.isLoading = false;
        state.page++;
      })
      .addCase(fetchAttractions.rejected, (state,action) => {
        console.log('fetchAttractions.rejected',action)
        state.error = "內部發生發生錯誤";
        state.isFetchAll = true;
        state.isLoading = false;
      });
      builder.addCase(fecthAttractionsByIdAndCounty.pending,(state)=>{
        state.isLoading=true;
      }).addCase(fecthAttractionsByIdAndCounty.fulfilled,(state,action)=>{
        state.isFetchAll = true;
        state.data = action.payload;
        state.isLoading = false;
      }).addCase(fecthAttractionsByIdAndCounty.rejected, (state,action)=>{
        state.error="內部發生發生錯誤";
        state.isFetchAll=true;
        state.isLoading=false
      })
  },
  initialState,
});

const { actions, reducer: countyAttractionsReducer } = slice;

export const {
  resetCountyStatus,
  changeCountyAttractionIsFromNearby,
} = actions;

export default countyAttractionsReducer;
