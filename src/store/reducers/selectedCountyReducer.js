import { CHANGE_COUNTY } from "../actions/types";
const selectedCountyReducer=(selectedCounty='',action)=>{
    if(action.type===CHANGE_COUNTY){
        return action.payload;
    }
    return selectedCounty;
}
export default selectedCountyReducer;