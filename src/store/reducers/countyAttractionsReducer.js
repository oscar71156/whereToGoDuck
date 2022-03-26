import { FETCH_COUNTY_ATTRACTIONS,SET_COUNTY_ISFETECHALL,FETCH_COUNTY_INIT_ATTRACTIONS} from "../actions/types";



const initState = {
    page:0,
    data: null,
    isFetchAll:false
  };
const countyAttractionsReducer=(state=initState,action)=>{

    if(action.type===FETCH_COUNTY_ATTRACTIONS){
        return{
            ...state,
            data:[...state.data,...action.payload],
            page:state.page+1
        };
    }else if(action.type=== SET_COUNTY_ISFETECHALL){
        return{
            ...state,
            isFetchAll:true
        }
    }else if(action.type===FETCH_COUNTY_INIT_ATTRACTIONS){
        return{
            ...state,
            data:action.payload,
            isFetchAll:false,
            page:1
        }
    }
    return state;
}

export default countyAttractionsReducer;