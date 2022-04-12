import {
  FETCH_NEARBY_ATTRACTIONS,
  SET_NEARBY_ISFETECHALL,
  SET_NEARBY_CENTER,
  RESET_NEARBY_FETCHING_STATUS,
  SET_NEARBY_LOADING,
  SET_NEARBY_ERROR
} from "../actions/types";
const initState = {
  page: 0,
  data: [],
  centerAttraction: null,
  isFetchAll: false,
  error: null,
  isLoading: false,
};

const nearbyAttractionsReducer = (state = initState, action) => {
  if (action.type === FETCH_NEARBY_ATTRACTIONS) {
    return {
      ...state,
      data: [...state.data, ...action.payload],
      page: state.page + 1,
    };
  }else if (action.type === SET_NEARBY_ISFETECHALL) {
    return { ...state, isFetchAll: action.payload };
  } else if (action.type === SET_NEARBY_CENTER) {
    return { ...state, centerAttraction: action.payload };
  } else if (action.type === RESET_NEARBY_FETCHING_STATUS) {
    let initFetchingStatus = { ...initState };
    delete initFetchingStatus.centerAttraction;
    return {
      ...state,
      ...initFetchingStatus,
    };
  } else if (action.type === SET_NEARBY_LOADING) {
    return {
      ...state,
      isLoading: action.payload,
    };
  }else if(action.type===SET_NEARBY_ERROR){
    return{
      ...state,
      error:action.payload
    }
  }
  return state;
};

export default nearbyAttractionsReducer;
