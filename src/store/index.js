import { configureStore } from "@reduxjs/toolkit";
import selectedCountyReducer from "./slice/selectedCounty";
import countyAttractionsReducer from "./slice/countyAttractions";
import { displayedAttractionReducer } from "./slice/displayedAttraction";
export default configureStore({
  reducer: {
    selectedCounty: selectedCountyReducer,
    countyAttractions: countyAttractionsReducer,
    displayedAttraction:displayedAttractionReducer
  },
});
