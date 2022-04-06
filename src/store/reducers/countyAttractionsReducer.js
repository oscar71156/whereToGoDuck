import {
  SET_COUNTY_ISFETECHALL,
  FETCH_COUNTY_ATTRACTIONS,
  SET_COUNTY_ATTRACTION_IN_NEARBY,
  SET_COUNTY_ERROR,
  SET_COUNTY_LOADING,
  RESET_COUNTY
} from "../actions/types";

const initState = {
  page: 0,
  data: [],
  isFetchAll: false,
  isCountyAttractionFromNearby: false,
  error: null,
  isLoading:false
};
const countyAttractionsReducer = (state = initState, action) => {
  if (action.type === SET_COUNTY_ISFETECHALL) {
    return {
      ...state,
      isFetchAll: action.payload,
    };
  } else if (action.type === FETCH_COUNTY_ATTRACTIONS) {
    return {
      ...state,
      data: [...state.data, ...action.payload],
      page: state.page + 1,
    };
  } else if (action.type === SET_COUNTY_ATTRACTION_IN_NEARBY) {
    return {
      ...state,
      isCountyAttractionFromNearby: action.payload,
    };
  } else if(action.type === SET_COUNTY_ERROR){
      return{
          ...state,
          error:action.payload
      }
  }else if(action.type===SET_COUNTY_LOADING){
    return{
      ...state,
      isLoading:action.payload
    }
  }else if(action.type===RESET_COUNTY){
    return{
      ...state,
      ...initState,
    }
  }
  return state;
};

export default countyAttractionsReducer;
