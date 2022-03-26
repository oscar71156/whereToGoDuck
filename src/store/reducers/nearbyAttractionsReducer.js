import {
  FETCH_NEARBY_ATTRACTIONS,
  SET_NEARBY_ISFETECHALL,
  FETCH_NEARBY_INIT_ATTRACTIONS
} from "../actions/types";
const initState = {
  page:0,
  data: null,
  centerAttraction:null,
  isFetchAll:false
};

const nearbyAttractionsReducer = (state = initState, action) => {
  if(action.type === FETCH_NEARBY_ATTRACTIONS) {
    return {...state,data:[...state.data,...action.payload],page:state.page+1,isFetchAll:false};
  }else if(action.type === FETCH_NEARBY_INIT_ATTRACTIONS){
    return {...state,page:1,data:action.payload,isFetchAll:false}
  }
  else if(action.type===SET_NEARBY_ISFETECHALL){
    return {...state,isFetchAll:action.payload}
  }
  return state;
};

export default nearbyAttractionsReducer;
