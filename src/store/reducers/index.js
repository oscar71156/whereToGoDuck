import selectedCountyReducer from "./selectedCountyReducer";
import countyAttractionsReducer from "./countyAttractionsReducer";
import nearbyAttractionsReducer from "./nearbyAttractionsReducer";
import {combineReducers} from 'redux';

export default  combineReducers({
    selectedCounty:selectedCountyReducer,
    countyAttractions:countyAttractionsReducer,
    nearbyAttractions:nearbyAttractionsReducer
})