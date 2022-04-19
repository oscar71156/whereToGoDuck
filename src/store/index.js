import { configureStore } from "@reduxjs/toolkit";
import selectedCountyReducer from "./slice/selectedCounty";
import countyAttractionsReducer from "./slice/countyAttractions";
import nearbyAttractionsReducer from "./slice/nearbyAttractions";
export default configureStore({
  reducer: {
    selectedCounty: selectedCountyReducer,
    countyAttractions: countyAttractionsReducer,
    nearbyAttractions: nearbyAttractionsReducer,
  },
});
