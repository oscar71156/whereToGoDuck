import { createSlice } from "@reduxjs/toolkit";
import { fecthDisplayedAttractionById } from "../actions/displayedAttraction";
const initialState = {
    isFetchAll: false,
    error: null,
    isLoading: false,
    data: null,
  };

const displayedAttractionSlice=createSlice({
    name:'displayedAttraction',
    reducers:{},
    initialState,
    extraReducers:(builder)=>{
        builder
        .addCase(fecthDisplayedAttractionById.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(fecthDisplayedAttractionById.fulfilled, (state, action) => {
          state.isFetchAll = true;
          state.data = action.payload;
          state.isLoading = false;
        })
        .addCase(fecthDisplayedAttractionById.rejected, (state, action) => {
          state.error = "內部發生發生錯誤";
          state.isFetchAll = true;
          state.isLoading = false;
        });
    }
})


export const {reducer:displayedAttractionReducer,actions}=displayedAttractionSlice;


